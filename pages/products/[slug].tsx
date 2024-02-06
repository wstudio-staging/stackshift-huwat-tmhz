/** This component displays content for the PRODUCT page */

import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { globalSEOQuery, productsQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { ProductSections } from "components/page/store/products";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CollectionProduct, CommonSections, DefaultSeoData } from "types";

interface ProductPageBySlugProps {
  data: Data;
  preview: boolean;
  token: string;
  source: string;
  defaultSeo: DefaultSeoData;
}

interface Data {
  productData: ProductData;
}

export interface ProductData extends CollectionProduct {
  commonSections: CommonSections;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
  slug: string | string[];
  defaultSeo: DefaultSeoData;
}

function ProductPageBySlug({
  data,
  preview,
  token,
  source,
  defaultSeo,
}: ProductPageBySlugProps) {
  const router = useRouter();
  const slug = router.query.slug;
  const showInlineEditor = source === "studio";
  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.productData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense fallback={"Loading..."}>
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
  const publishedData = data?.productData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
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
      {data?.productData && <ProductSections data={publishedData} />}
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
  const previewDataEventSource = usePreview(token, productsQuery, { slug });
  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
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
      {data?.productData && <ProductSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}: any): Promise<{ props: ProductPageBySlugProps; revalidate: number }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [products, globalSEO] = await Promise.all([
    client.fetch(productsQuery, { slug: params.slug }),
    client.fetch(globalSEOQuery),
  ]);

  // pass products data and preview to helper function
  const singleProductsData: ProductData = filterDataToSingleItem(
    products,
    preview
  );

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: {
        productData: singleProductsData || null,
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

  const products = await sanityClient.fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(ProductPageBySlug);
