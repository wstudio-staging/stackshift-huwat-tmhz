import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { format } from "date-fns";
import { ConditionalLink } from "helper";

import { BlogProps } from "./index";

function VariantB({ subtitle, title, posts, primaryButton }: BlogProps) {
  let blogsPerPage = 5,
    count = 0;

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-wrap justify-center">
            <div className="mb-16 w-full text-center">
              {subtitle && (
                <span className="font-bold text-webriq-darkblue">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                  {title}
                </h1>
              )}
            </div>
            <div className="-mx-3 mb-16 flex flex-wrap">
              <div className="mb-6 w-full px-3 lg:mb-0 lg:w-1/2">
                {posts?.slice(count, count + 1)?.map((post, key) => (
                  <div className="overflow-hidden rounded shadow" key={key}>
                    {post?.mainImage && (
                      <Image
                        className="h-full w-full overflow-hidden rounded-t object-cover"
                        src={urlFor(post?.mainImage)}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        width={271}
                        height={248}
                        alt={`blog-variantB-image-${key}`}
                      />
                    )}
                    <div className="mt-auto rounded-b bg-white p-6">
                      {post?.publishedAt && (
                        <span className="text-sm text-gray-500">
                          {format(new Date(post?.publishedAt), " dd MMM, yyyy")}
                        </span>
                      )}
                      {post?.title && (
                        <h1 className="my-2 text-lg font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                          {post?.title}
                        </h1>
                      )}
                      {post?.excerpt && (
                        <p className="mb-6 text-justify text-xs leading-loose text-gray-500 lg:text-base xl:text-base 2xl:text-base">
                          {post?.excerpt}
                        </p>
                      )}
                      {post?.slug?.current && (
                        <Link
                          aria-label="View Blog Post"
                          className="font-bold text-webriq-darkblue hover:text-webriq-babyblue"
                          href={`/${post?.slug?.current}` ?? "/page-not-found"}
                        >
                          View Blog Post
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-wrap lg:w-1/2">
                {posts?.slice(count + 1, blogsPerPage)?.map((post, key) => (
                  <div className="mb-6 w-full px-3 lg:w-1/2" key={key}>
                    <div className="overflow-hidden rounded shadow">
                      {post?.mainImage && (
                        <Image
                          className="h-full w-full overflow-hidden rounded-t object-cover"
                          src={urlFor(post?.mainImage)}
                          sizes="100vw"
                          width={259}
                          height={192}
                          alt={`blog-variantB-image-${key}`}
                        />
                      )}
                      <div className="mt-auto rounded-b bg-white p-6">
                        {post?.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {format(
                              new Date(post?.publishedAt),
                              " dd MMM, yyyy"
                            )}
                          </span>
                        )}
                        {post?.title && (
                          <h1 className="my-2 text-lg font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                            {post?.title}
                          </h1>
                        )}
                        {post?.excerpt && (
                          <p className="mb-6 text-justify leading-loose text-gray-500">
                            {post?.excerpt}
                          </p>
                        )}
                        {post?.slug?.current && (
                          <Link
                            aria-label="View Blog Post"
                            className="font-bold text-webriq-darkblue hover:text-webriq-babyblue"
                            href={
                              `/${post?.slug?.current}` ?? "/page-not-found"
                            }
                          >
                            View Blog Post
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
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
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
