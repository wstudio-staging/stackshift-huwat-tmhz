import React from "react";
import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";
import { NEXT_PUBLIC_SITE_URL } from "../config";
import { SectionBadge } from "./sectionBadge";

export function LiveURLBadge(
  props: DocumentBadgeProps
): DocumentBadgeDescription {
  const { type } = props;
  let siteUrl = "http://localhost:3000";
  if (
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost")
  ) {
    siteUrl = NEXT_PUBLIC_SITE_URL;
  }
  const isPublished = !props.draft;

  if (["page", "post"].includes(type)) {
    // page and post or any document type
    return {
      label: (
        <Link
          target={`${siteUrl}/${
            isPublished
              ? props?.published?.slug?.current
              : props?.draft?.slug?.current ?? ""
          }`}
          isPublished={isPublished}
        />
      ),
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else if (type === "mainProduct") {
    return {
      label: (
        <Link
          target={`${siteUrl}/products/${
            isPublished
              ? props?.published?.slug?.current
              : props?.draft?.slug?.current ?? ""
          }`}
          isPublished={isPublished}
        />
      ),
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else if (type === "mainCollection") {
    return {
      label: (
        <Link
          target={`${siteUrl}/collections/${
            isPublished
              ? props?.published?.slug?.current
              : props?.draft?.slug?.current ?? ""
          }`}
          isPublished={isPublished}
        />
      ),
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else if (type === "cartPage") {
    return {
      label: <Link target={`${siteUrl}/cart`} isPublished={isPublished} />,
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else if (type === "wishlistPage") {
    return {
      label: <Link target={`${siteUrl}/wishlist`} isPublished={isPublished} />,
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else if (type === "searchPage") {
    return {
      label: <Link target={`${siteUrl}/search`} isPublished={isPublished} />,
      title: isPublished
        ? "Open LIVE URL in a new window!"
        : "Publish document first to open LIVE URL",
      color: isPublished ? "success" : "warning",
    };
  } else {
    return SectionBadge(props);
  }
}

const Link = ({
  target,
  isPublished,
}: {
  target: string;
  isPublished: boolean;
}) => {
  return (
    <a
      onClick={() => (isPublished ? window.open(target) : null)}
      target="_blank"
      style={{
        marginRight: 5,
        padding: 8,
        fontSize: "1.5em",
        textTransform: "lowercase",
        color: isPublished ? "#31975e" : "#958228",
        cursor: isPublished ? "pointer" : "default",
      }}
    >
      {target}
    </a>
  );
};
