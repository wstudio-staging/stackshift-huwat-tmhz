import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { urlFor, PortableText } from "lib/sanity";
import { format } from "date-fns";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";
import { MyPortableTextComponents, BlogsData } from "types";

const Navigation = dynamic(() => import("components/sections/navigation"));
const Footer = dynamic(() => import("components/sections/footer"));
// block styling as props to `components` of the PortableText component
const blockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-4xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-2xl leading-loose text-gray-900">
          {children}
        </h4>
      );
    },
    h5: ({ children }) => {
      return (
        <h5 className="mb-6 text-xl leading-loose text-gray-900">{children}</h5>
      );
    },
    h6: ({ children }) => {
      return (
        <h6 className="mb-6 text-lg leading-loose text-gray-900">{children}</h6>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="mb-6 text-justify leading-loose text-gray-900">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 italic leading-loose text-gray-500">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    return (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    );
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className="mb-6 list-disc pl-10 leading-loose text-gray-900">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 list-decimal pl-10 leading-loose text-gray-900">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <Link
        className="hover:text-webriq-blue text-webriq-darkblue"
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  types: {
    addImage: ({ value }) => (
      <Image
        className="mb-10 h-full w-full"
        width={300}
        height={300}
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};

interface BlogSectionsProps {
  data: BlogsData;
}

function BlogSections({ data }: BlogSectionsProps) {
  const blogData: BlogsData = data || data?.[0];

  const showInlineEditor = React.useContext(InlineEditorContext);
  if (!blogData) {
    return null;
  }

  const {
    _id,
    _type,
    authors,
    categories,
    body,
    mainImage,
    publishedAt,
    title,
    navigation,
    footer,
  } = blogData;

  return (
    <InlineEditor
      document={{
        id: _id,
        type: _type,
      }}
      showInlineEditor={showInlineEditor}
      key={_id}
    >
      {navigation && (
        <Navigation
          data={navigation}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      )}
      <section className="pb-20">
        <div
          className="mb-12 p-20"
          style={{
            backgroundImage: `url(${mainImage && urlFor(mainImage)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              {categories &&
                categories?.map((tag, index) => (
                  <span
                    className="text-base uppercase text-webriq-blue lg:text-xl"
                    key={index}
                  >
                    {tag?.title}
                  </span>
                ))}
              {categories && publishedAt && (
                <span className="mx-2 text-base uppercase text-gray-500 lg:text-xl">
                  •
                </span>
              )}
              {publishedAt && (
                <span
                  className={`text-base text-white lg:text-xl ${
                    categories ?? "ml-2"
                  }`}
                >
                  {format(new Date(publishedAt), "MMMM dd, yyyy")}
                </span>
              )}
              <div className="mt-2">
                {title && (
                  <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
                    {title}
                  </h2>
                )}
                <div className="flex justify-center">
                  {authors &&
                    authors?.map((author, index, { length }) => (
                      <div className="flex justify-center" key={index}>
                        <div className="mr-4">
                          {author?.profile?.image ? (
                            <Image
                              className="h-12 w-12 rounded-full object-cover object-top"
                              width={48}
                              height={48}
                              src={urlFor(author?.profile?.image)}
                              alt={author?.profile?.alt ?? author?.name}
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                            </svg>
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-webriq-blue">
                            {author?.name}
                          </h3>
                          {index + 1 !== length ? (
                            <span>&nbsp;and&nbsp;</span>
                          ) : null}
                          <span className="text-xs italic text-webriq-lightblue">
                            {authors?.length > 1 ? "Authors" : "Author"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {body && (
            <div className="mx-auto max-w-4xl break-all">
              <PortableText value={body} components={blockStyle} />
            </div>
          )}
        </div>
      </section>
      {footer && (
        <Footer
          data={footer}
          template={{
            bg: "gray",
            color: "webriq",
          }}
        />
      )}
    </InlineEditor>
  );
}

export default React.memo(BlogSections);
