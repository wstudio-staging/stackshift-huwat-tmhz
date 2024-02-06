import React from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { cartPageQuery, globalSEOQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem, SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";

interface CartPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
  defaultSeo: DefaultSeoData;
}

interface Data {
  cartData: CartData;
}
export interface CartData extends CommonPageData {
  cartSectionVariant?: {
    variant: string;
    _type: string;
  };
  id?: string;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
  defaultSeo: DefaultSeoData;
}

function CartPage({ data, preview, token, source, defaultSeo }: CartPageProps) {
  const showInlineEditor = source === "studio";

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading">
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
  const publishedData = data?.cartData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo, _type } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Cart", type: _type, route: "cart", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Cart"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.cartData && <CartSections data={publishedData} />}
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
  const previewDataEventSource = usePreview(token, cartPageQuery);
  const previewData: CartData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Cart", type: _type, route: "cart", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Cart"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.cartData && <CartSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any): Promise<{ props: CartPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [cartPage, globalSEO] = await Promise.all([
    client.fetch(cartPageQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const cartData: CartData = filterDataToSingleItem(cartPage, preview);

  if (!cartData) {
    return {
      props: {
        preview,
        data: { cartData: null },
        defaultSeo: globalSEO,
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { cartData },
      defaultSeo: globalSEO,
    },
  };
}

export default React.memo(CartPage);
