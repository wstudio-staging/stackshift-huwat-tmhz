/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { assemblePageUrl } from "../frontendUtils";
import styles from "./FacebookShare.module.css";
import { urlFor } from "lib/sanity";

function FacebookShare(props) {
  const { document, width = 500, options, defaultSeo } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://").pop();

  const seoImage = seo?.seoImage ?? defaultSeo?.defaultSeoImage;

  return (
    <div className={styles.seoItem}>
      <h3>Facebook share</h3>
      <div className={styles.facebookWrapper} style={{ width }}>
        <div className={styles.facebookImageContainer}>
          {seoImage && (
            <img className={styles.facebookCardImage} src={urlFor(seoImage)} />
          )}
        </div>
        <div className={styles.facebookCardContent}>
          <div className={styles.facebookCardUrl}>
            {websiteUrlWithoutProtocol}
          </div>
          <div className={styles.facebookCardTitle}>
            <a href={url}>{title}</a>
          </div>
          <div className={styles.facebookCardDescription}>
            {seo?.seoDescription ?? defaultSeo?.defaultSeoDescription}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacebookShare;
