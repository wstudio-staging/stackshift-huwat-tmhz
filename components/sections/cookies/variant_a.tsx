import React from "react";
import { PortableText } from "lib/sanity";
import { setCookie, getCookie } from "utils/cookies";

import { PortableTextComponents } from "@portabletext/react";
import { CookiesProps } from ".";

// block styling as props to `components` of the PortableText component
export const cookiesBlockStyling: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      return <p className="my-5 text-sm text-gray-500">{children}</p>;
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        aria-label={value.href ?? "external link"}
        className="text-blue-400 hover:text-webriq-lightblue"
        target="_blank"
        href={value.href}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function VariantA({
  title,
  block,
  allowCookieBtn,
  denyCookieBtn,
}: CookiesProps) {
  const cookie = getCookie();
  const [showCookie, setShowCookie] = React.useState<boolean>(!!cookie);

  return (
    <div className="fixed bottom-0 z-50">
      {!showCookie ? (
        <div className="container mx-auto px-4">
          {(title || block) && (
            <div className="mb-6 flex flex-wrap items-center rounded-lg bg-gray-800 p-6 text-white">
              <div className="w-full px-4 lg:w-2/3">
                <p className="font-heading font-bold">{title}</p>
                {block && (
                  <PortableText
                    value={block}
                    components={cookiesBlockStyling}
                  />
                )}
              </div>
              <div className="px-4 lg:w-1/3 lg:text-right">
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
          )}
        </div>
      ) : null}
    </div>
  );
}
export default React.memo(VariantA);
