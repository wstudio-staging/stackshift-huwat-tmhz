import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";
import { cookiesBlockStyling } from "./variant_a";

import { CookiesProps } from ".";

function VariantC({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState(!!cookie);

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie
        ? title && (
            <div className="mx-4 mb-6 max-w-md rounded-lg bg-gray-800 p-6 px-10 text-white md:mx-0 md:ml-10">
              <div className="text-center">
                <p className="font-heading font-bold">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
                {allowCookieBtn && (
                  <button
                    aria-label={allowCookieBtn}
                    type="button"
                    className="mr-4 inline-block rounded-l-xl rounded-t-xl border-2 border-webriq-darkblue bg-webriq-darkblue px-4 py-2 transition duration-500 hover:border-webriq-blue hover:bg-webriq-blue"
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
          )
        : null}
    </div>
  );
}
export default React.memo(VariantC);
