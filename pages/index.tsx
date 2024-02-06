import React from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { homeQuery, globalSEOQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";

interface HomeProps {
  data: Data;
  preview: boolean;
  token?: string | null;
  source?: string;
  defaultSeo: DefaultSeoData;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string | null;
  defaultSeo: DefaultSeoData;
}

interface Data {
  pageData: PageData | null;
}

interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ data, preview, token, source, defaultSeo }: HomeProps) {
  const showInlineEditor = source === "studio";

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading...">
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, token, defaultSeo }} />
          </InlineEditorContextProvider>
        </PreviewSuspense>
      </>
    );
  }

  return <Document {...{ data, defaultSeo }} />;
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
  const publishedData = data?.pageData;

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
      {data?.pageData && <PageSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({
  data,
  token = null,
  defaultSeo,
}: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, homeQuery);

  const previewData: PageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, _type, seo } = previewData;

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

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData} />}
    </>
  );
}

export const getStaticProps = async ({
  preview = false,
  previewData = {},
}: any): Promise<{ props: HomeProps }> => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [indexPage, globalSEO] = await Promise.all([
    client.fetch(homeQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const pageData: PageData = filterDataToSingleItem(indexPage, preview);

  // if our query failed, then return null to display custom no-preview page
  if (!pageData) {
    return {
      props: {
        preview,
        data: { pageData: null },
        defaultSeo: globalSEO,
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { pageData },
      defaultSeo: globalSEO,
    },
  };
};

export default Home;
