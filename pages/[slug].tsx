import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { blogQuery, slugQuery, globalSEOQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem, SEO } from "components/list";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { GetStaticPaths, GetStaticProps } from "next";
import { CommonPageData, BlogsData, DefaultSeoData } from "types";

interface PageBySlugProps {
  data: Data;
  preview: boolean;
  token: string | null;
  source: string;
  defaultSeo: DefaultSeoData;
}

interface DocumentWithPreviewProps {
  data: Data;
  slug: string | string[];
  token: string | null;
  source: string;
  defaultSeo: DefaultSeoData;
}

interface Data {
  pageData: PageData | null;
  blogData: BlogsData | null;
}

export interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

export function PageBySlug({
  data,
  preview,
  token,
  source,
  defaultSeo,
}: PageBySlugProps) {
  const router = useRouter();
  const slug = router.query.slug;
  const showInlineEditor = source === "studio";

  if (!data?.pageData && !data?.blogData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense fallback="Loading...">
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview
                {...{ data, token: token || null, slug, source, defaultSeo }}
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
  const publishedData = data?.pageData || data?.blogData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, _type, seo } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: publishedData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={data?.pageData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={data?.blogData} />}
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
  const previewDataEventSource = usePreview(
    token,
    data?.pageData ? slugQuery : blogQuery, // as a fallback we assume it's a blog post
    {
      slug,
    }
  );

  const previewData: PageData | BlogsData =
    previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: previewData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/* if page has no sections, show no sections only in preview */}
      {_type === "page" &&
        "sections" in previewData &&
        (!previewData ||
          !previewData?.sections ||
          previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData as PageData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={previewData as BlogsData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = {},
}: any): Promise<{ props: PageBySlugProps; revalidate?: number }> => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [page, blogData, globalSEO] = await Promise.all([
    client.fetch(slugQuery, { slug: params.slug }),
    client.fetch(blogQuery, { slug: params.slug }),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const singlePageData: PageData = filterDataToSingleItem(page, preview);
  const singleBlogData: BlogsData = filterDataToSingleItem(blogData, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData?.source) || "",
      data: {
        pageData: singlePageData || null,
        blogData: singleBlogData || null,
      },
      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const paths = await sanityClient.fetch(
    groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(PageBySlug);
