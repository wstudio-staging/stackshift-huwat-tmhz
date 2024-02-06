import React, { useEffect } from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { searchPageQuery, globalSEOQuery } from "pages/api/query";
import { SearchPageSections } from "components/page/store/search";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";

import { CommonPageData, DefaultSeoData } from "types";

interface SeachPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
  defaultSeo: DefaultSeoData;
}

interface Data {
  searchData: SearchData;
}

export interface SearchData extends CommonPageData {
  collections: any;
  slug: string | string[] | null;
}

interface DocumentWithPreviewProps {
  data: Data;
  token?: string | null;
  defaultSeo: DefaultSeoData;
}

function SearchPage({
  data,
  preview,
  token,
  source,
  defaultSeo,
}: SeachPageProps) {
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);
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
  const publishedData = data?.searchData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo, _type } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Search", type: _type, route: "search", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Search"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.searchData && <SearchPageSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({
  data,
  token = null,
  defaultSeo,
}: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, searchPageQuery);
  const previewData = previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Search", type: _type, route: "search", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Search"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.searchData && <SearchPageSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any): Promise<{ props: SeachPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [searchPage, globalSEO] = await Promise.all([
    client.fetch(searchPageQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const searchData: SearchData = filterDataToSingleItem(searchPage, preview);

  if (!searchData) {
    return {
      props: {
        preview,
        data: { searchData: null },
        defaultSeo: globalSEO,
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { searchData },
      defaultSeo: globalSEO,
    },
  };
}

export default React.memo(SearchPage);
