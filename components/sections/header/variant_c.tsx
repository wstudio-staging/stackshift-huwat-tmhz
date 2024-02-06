import React from "react";
import { ConditionalLink } from "helper";

import { HeaderProps } from ".";

function VariantC({
  template,
  videoLink,
  title,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  // get the video link ID
  let videoLinkId;

  if (videoLink) {
    if (videoLink.includes("embed")) {
      videoLinkId = videoLink.split("/")[4];
    } else {
      videoLinkId = videoLink.split("/watch?v=")[1] || videoLink.split("/")[3];
    }
  }

  return (
    <section>
      <div className="bg-gray-50 py-20 md:py-52 lg:py-52">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-20">
            <h1 className="mb-10 text-lg font-bold md:text-4xl lg:text-5xl">
              {title && <span>{title}</span>}
            </h1>
            <div>
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
              {secondaryButton?.label && (
                <ConditionalLink
                  ariaLabel={secondaryButton?.label}
                  link={secondaryButton}
                  className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                >
                  {secondaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
          <div className="md:mx-20 lg:mx-60 xl:mx-60">
            <div className="aspect-video">
              {videoLink && (
                <iframe
                  aria-label="Show Video Frame"
                  className="h-full w-full rounded-3xl border-4 border-webriq-darkblue"
                  src={`https://www.youtube.com/embed/${videoLinkId}`}
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden;border-radius:24px}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${`https://www.youtube.com/embed/${videoLinkId}`}><img src=${`https://i.ytimg.com/vi_webp/${videoLinkId}/maxresdefault.webp`} alt=${title} loading="lazy" /><span>▶</span></a>`}
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
