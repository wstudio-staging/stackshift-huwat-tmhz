import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalLink } from "helper";

import { BlogProps } from ".";

function VariantA({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 6,
    count = 0;

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            {subtitle && (
              <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            )}
            {title && (
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          {posts && (
            <div className="-mx-3 flex flex-wrap justify-center">
              <div className="flex w-full flex-wrap lg:w-1/2">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="mb-5 w-full px-3" key={key}>
                    <div className="relative mx-auto h-64 rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative h-full w-full overflow-hidden rounded object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 rounded bg-gray-900 opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute left-5 top-5 flex">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mr-3 rounded-full bg-white px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            aria-label={post?.title}
                            className="transform text-xl font-bold text-white hover:scale-110 hover:text-webriq-babyblue motion-reduce:transform-none lg:text-2xl"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {posts?.slice(count + 1, count + 3)?.map((post, key) => (
                  <div className="mb-5 w-full px-3 lg:w-1/2" key={key}>
                    <div className="relative mx-auto h-64 rounded">
                      {post?.mainImage?.asset?._ref && (
                        <Image
                          className="relative h-full w-full overflow-hidden rounded object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          style={{
                            objectFit: "fill",
                          }}
                          sizes="(min-width: 1540px) 358px, (min-width: 1280px) 294px, (min-width: 1040px) 230px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 rounded bg-gray-900 opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute left-5 top-5 flex">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto mr-3 rounded-full bg-white px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="transform text-xl font-bold text-white hover:scale-110 hover:text-webriq-babyblue motion-reduce:transform-none lg:text-2xl"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-wrap lg:w-1/2">
                {posts?.slice(count + 3, count + 5)?.map((post, key) => (
                  <div className="mb-5 w-full px-3 lg:w-1/2" key={key}>
                    <div className="relative mx-auto h-64 rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative h-full w-full overflow-hidden rounded object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 358px, (min-width: 1280px) 294px, (min-width: 1040px) 230px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 rounded bg-gray-900 opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute left-5 top-5 flex">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto mr-3 rounded-full bg-white px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="transform text-xl font-bold text-white hover:scale-110 hover:text-webriq-babyblue motion-reduce:transform-none lg:text-2xl"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {posts?.slice(count + 5, blogsPerPage)?.map((post, key) => (
                  <div className="mb-5 w-full px-3" key={key}>
                    <div className="relative mx-auto h-64 rounded">
                      {post?.mainImage && (
                        <Image
                          className="relative h-full w-full overflow-hidden rounded object-cover"
                          src={urlFor(post?.mainImage)}
                          alt={`blog-variantA-image-${key}`}
                          sizes="(min-width: 1540px) 740px, (min-width: 1280px) 612px, (min-width: 1040px) 484px, (min-width: 780px) 736px, (min-width: 680px) 608px, calc(94.44vw - 15px)"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 rounded bg-gray-900 opacity-75" />
                      <div className="absolute inset-0 flex flex-col items-start p-6">
                        {post?.categories && (
                          <div className="absolute left-5 top-5 flex">
                            {post?.categories?.map((category, index) => (
                              <span
                                className="mb-auto mr-3 rounded-full bg-white px-3 py-1 text-sm font-bold uppercase text-webriq-darkblue"
                                key={index}
                              >
                                {category?.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post?.publishedAt && (
                          <span className="mt-auto text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              "dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <Link
                            className="transform text-xl font-bold text-white hover:scale-110 hover:text-webriq-babyblue motion-reduce:transform-none lg:text-2xl"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            {post?.title?.length > 50
                              ? post?.title.substring(0, 50) + "..."
                              : post?.title}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
