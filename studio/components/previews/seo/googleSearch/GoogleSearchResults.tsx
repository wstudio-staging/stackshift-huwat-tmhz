/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types, react/prop-types */
import React from "react";
import { assemblePageUrl } from "../frontendUtils";
import styles from "./GoogleSearchResults.module.css";
import { format } from "date-fns";

function GoogleSearchResult(props) {
  const { document, options, width = 500, defaultSeo } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const date =
    document?._updatedAt &&
    format(new Date(document?._updatedAt), "MMM dd, yyyy");

  return (
    <div className={styles.seoItem}>
      <h3>Google search result preview</h3>
      <div className={styles.googleWrapper} style={{ width }}>
        <div className={styles.url}>{url}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {`${date} — ${
            seo?.seoDescription ??
            defaultSeo?.defaultSeoDescription ??
            "SEO description not added"
          }`}
        </div>
      </div>
    </div>
  );
}

export default GoogleSearchResult;
