/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import { format } from "date-fns";
import { assemblePageUrl } from "../frontendUtils";
import styles from "./TwitterCard.module.css";
import { urlFor } from "lib/sanity";

const author = {
  name: "WebriQ",
  handle: "WebriQgoesMad",
  image:
    "https://pbs.twimg.com/profile_images/1408052895531126790/BAhX7Puq_400x400.jpg",
};

function TwitterCard(props) {
  const { document, width = 500, options, defaultSeo } = props;
  const { title, seo } = document;
  const url = assemblePageUrl({ document, options });
  const websiteUrlWithoutProtocol = url.split("://").pop();

  const seoImage =
    seo?.seoImage ?? defaultSeo?.defaultSeoImage ?? author?.image;

  const date =
    document?._updatedAt && format(new Date(document?._updatedAt), "MMM dd");

  return (
    <div className={styles.seoItem}>
      <h3>Twitter card preview</h3>
      <div className={styles.tweetWrapper} style={{ width }}>
        {author && (
          <div className={styles.tweetAuthor}>
            <img
              className={styles.tweetAuthorAvatar}
              src={
                author && typeof author.image === "object"
                  ? urlFor(seoImage)
                  : author.image
              }
            />
            <span className={styles.tweetAuthorName}>{author.name}</span>
            <span className={styles.tweetAuthorHandle}>@{author.handle}</span>
            <span className={styles.tweetBullet}>•</span>
            <span className={styles.tweetAuthorHandle}>{date}</span>
          </div>
        )}

        <div className={styles.tweetText}>
          <p>
            The card for your website will look a little something like this!
          </p>
        </div>
        <div className={styles.tweetCardPreview}>
          <div className={styles.tweetCardImageContainer}>
            {seoImage && (
              <img className={styles.tweetCardImage} src={urlFor(seoImage)} />
            )}
          </div>
          <div className={styles.tweetCardContent}>
            <div className={styles.tweetUrlWrapper}>
              {websiteUrlWithoutProtocol}
            </div>
            <div className={styles.tweetCardTitle}>
              <a href={url}>{title}</a>
            </div>
            <div className={styles.tweetCardDescription}>
              {seo?.seoDescription ?? defaultSeo?.defaultSeoDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwitterCard;
