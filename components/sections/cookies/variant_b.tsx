import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";

function VariantB({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {!showCookie
        ? title && (
            <div className="bg-gray-800 py-6 text-white">
              <div className="container mx-auto px-4">
                <div className="-mx-4 flex flex-wrap items-center">
                  <div className="w-full px-4 lg:w-3/4">
                    <p className="font-heading font-bold">{title}</p>
                    {block && (
                      <PortableText
                        value={block}
                        components={cookiesBlockStyling}
                      />
                    )}
                  </div>
                  <div className="w-full px-4 lg:w-1/4 lg:text-right">
                    {allowCookieBtn && (
                      <button
                        aria-label={allowCookieBtn}
                        type="button"
                        className="m-2 inline-block rounded-l-xl rounded-t-xl border-2 border-webriq-darkblue bg-webriq-darkblue px-4 py-2 transition duration-500 hover:border-webriq-blue hover:bg-webriq-blue"
                        onClick={() => {
                          setCookie("allow");
                          setShowCookie(!showCookie);
                        }}
                      >
                        {allowCookieBtn}
                      </button>
                    )}
                    {denyCookieBtn && (
                      <button
                        aria-label={denyCookieBtn}
                        type="button"
                        className="m-2 inline-block rounded-r-xl rounded-t-xl border-2 border-gray-400 px-4 py-2 transition duration-500 hover:bg-gray-700"
                        onClick={() => {
                          setCookie("dismiss");
                          setShowCookie(!showCookie);
                        }}
                      >
                        {denyCookieBtn}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        : null}
    </div>
  );
}
export default React.memo(VariantB);
