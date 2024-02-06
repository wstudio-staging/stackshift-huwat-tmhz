import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalLink } from "helper";

import { BlogProps } from ".";

function VariantC({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 3;

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center">
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              {subtitle && (
                <span className="font-bold text-webriq-darkblue">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="font-heading text-4xl font-bold lg:text-5xl xl:text-5xl">
                  {title}
                </h1>
              )}
            </div>
            {primaryButton?.label && (
              <ConditionalLink
                link={primaryButton}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                ariaLabel={primaryButton?.label}
              >
                {primaryButton?.label}
              </ConditionalLink>
            )}
          </div>
          {posts && (
            <div>
              {posts?.slice(0, blogsPerPage)?.map((post, key) => (
                <div
                  className="mb-8 flex flex-wrap overflow-hidden rounded-lg shadow"
                  key={key}
                >
                  {key % 2 === 0 ? (
                    <>
                      {post?.mainImage && (
                        <Image
                          className="h-auto w-full rounded-l object-cover lg:w-1/2"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={554}
                          height={416}
                          alt={`blog-variantC-image-${key}`}
                        />
                      )}
                      <div className="w-full rounded-r bg-white px-6 py-6 lg:w-1/2 lg:pt-10">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="mb-auto mr-3 rounded-full bg-webriq-lightblue px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                              key={index}
                            >
                              {category?.title}
                            </span>
                          ))}
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="mb-10 flex">
                            <span className="italic text-webriq-darkblue">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="italic text-webriq-darkblue">
                                  {author?.name}
                                </span>
                                {index + 1 !== length ? (
                                  <span>&nbsp;,&nbsp;</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 text-justify text-sm text-gray-500 lg:text-base lg:leading-loose xl:text-base xl:leading-loose 2xl:text-base 2xl:leading-loose">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label="View Blog Post"
                            className="font-bold text-webriq-darkblue hover:text-webriq-blue"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full rounded-r bg-white px-6 py-6 lg:w-1/2 lg:pt-10">
                        {post?.categories &&
                          post?.categories?.map((category, index) => (
                            <span
                              className="mb-auto mr-3 rounded-full bg-webriq-lightblue px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                              key={index}
                            >
                              {category?.title}
                            </span>
                          ))}
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                            {post?.title}
                          </h1>
                        )}
                        {post?.authors && (
                          <div className="mb-10 flex">
                            <span className="italic text-webriq-darkblue">
                              By&nbsp;
                            </span>
                            {post?.authors?.map((author, index, { length }) => (
                              <div key={index}>
                                <span className="italic text-webriq-darkblue">
                                  {author?.name}
                                </span>
                                {index + 1 !== length ? (
                                  <span>&nbsp;,&nbsp;</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 text-justify text-sm text-gray-500 lg:text-base lg:leading-loose xl:text-base xl:leading-loose 2xl:text-base 2xl:leading-loose">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label="View Blog Post"
                            className="font-bold text-webriq-darkblue hover:text-webriq-blue"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                      {post?.mainImage && (
                        <Image
                          className="order-0 h-auto w-full rounded-l object-cover lg:order-1 lg:w-1/2"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={554}
                          height={416}
                          alt={`blog-variantC-image-${key}`}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {primaryButton?.label && (
            <div className="block text-center lg:hidden lg:w-1/2">
              <ConditionalLink
                link={primaryButton}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
                ariaLabel={primaryButton?.label}
              >
                {primaryButton?.label}
              </ConditionalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
