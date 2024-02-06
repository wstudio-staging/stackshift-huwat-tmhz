/** This component displays content for the COLLECTIONS page */

import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { collectionsQuery, globalSEOQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { CollectionSections } from "components/page/store/collections";
import InlineEditorContextProvider from "context/InlineEditorContext";

import {
  CommonPageData,
  CommonSections,
  CollectionProduct,
  DefaultSeoData,
} from "types";

interface CollectionPageBySlugProps {
  data: Data;
  preview: boolean;
  token: string;
  source: string;
  defaultSeo: DefaultSeoData;
}
interface Data {
  collectionData: CollectionData;
}

export interface CollectionData extends CommonPageData {
  collectionInfoVariant?: {
    variant?: string;
  };
  commonSections?: CommonSections | null;
  products?: CollectionProduct[] | null;
  slug?: string | null;
  name?: string | null;
}

interface DocumentWithPreviewProps {
  data: Data;
  slug: string | string[];
  token: string;
  defaultSeo: DefaultSeoData;
}

function CollectionPageBySlug({
  data,
  preview,
  token,
  source,
  defaultSeo,
}: CollectionPageBySlugProps) {
  const router = useRouter();
  const slug = router.query.slug;
  const showInlineEditor = source === "studio";

  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.collectionData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense fallback="Loading...">
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview
                {...{ data, token: token || null, slug, defaultSeo }}
              />
            </InlineEditorContextProvider>
          </PreviewSuspense>
        </>
      );
    }

    return <Document {...{ data, defaultSeo }} />;
  }
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({
  data,
  defaultSeo,
}: {
  data: Data;
  defaultSeo: DefaultSeoData;
}) {
  const publishedData = data?.collectionData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    seo, // collection page SEO
    _type, // page type
  } = publishedData;

  const finalSEO = commonSections?.seo ?? seo;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: name,
            type: _type,
            route: publishedData?.slug,
            ...finalSEO,
          }}
          defaultSeo={defaultSeo}
        />
        <link rel="icon" href="../favicon.ico" />
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* Show Product page sections */}
      {data?.collectionData && <CollectionSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({
  data,
  slug,
  token = null,
  defaultSeo,
}: DocumentWithPreviewProps) {
  // Current drafts data in Sanity
  const previewDataEventSource = usePreview(token, collectionsQuery, { slug });
  const previewData: CollectionData =
    previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    seo, // collection page SEO
    _type, // page type
  } = previewData;

  const finalSEO = commonSections?.seo ?? seo;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: name,
            type: _type,
            route: previewData?.slug,
            ...finalSEO,
          }}
          defaultSeo={defaultSeo}
        />
        <link rel="icon" href="../favicon.ico" />
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/* Show Product page sections */}
      {data?.collectionData && <CollectionSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}: any): Promise<{ props: CollectionPageBySlugProps; revalidate: number }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [collections, globalSEO] = await Promise.all([
    client.fetch(collectionsQuery, {
      slug: params.slug,
    }),
    client.fetch(globalSEOQuery),
  ]);

  // pass collections data and preview to helper function
  const singleCollectionsData: CollectionData = filterDataToSingleItem(
    collections,
    preview
  );

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: {
        collectionData: singleCollectionsData || null,
      },
      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const collections = await sanityClient.fetch(
    groq`*[_type == "mainCollection" && defined(slug.current)][].slug.current`
  );

  return {
    paths: collections.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(CollectionPageBySlug);
