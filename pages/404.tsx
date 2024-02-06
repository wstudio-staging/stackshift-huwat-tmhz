import React from "react";
import Link from "next/link";
import Head from "next/head";

function PageNotFound() {
  return (
    <>
      <Head>
        <title>404: Page not found</title>
      </Head>
      <section>
        <div className="skew skew-top mr-for-radius">
          <svg
            className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 10 0 10" />
          </svg>
        </div>
        <div className="skew skew-top ml-for-radius">
          <svg
            className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 10 10 0 10 10" />
          </svg>
        </div>
        <div className="radius-for-skewed bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <span className="mb-6 text-4xl font-bold text-webriq-darkblue">
                Whoops!
              </span>
              <h3 className="mb-2 text-4xl font-bold">Something went wrong!</h3>
              <p className="mb-8 text-gray-400">
                Sorry, but we are unable to open this page
              </p>
              <div>
                <Link
                  className="mb-2 inline-block w-full rounded-l-xl rounded-t-xl bg-webriq-blue px-6 py-2 font-bold leading-loose text-gray-50 hover:bg-webriq-darkblue lg:mb-0 lg:mr-4 lg:w-auto"
                  href="/"
                >
                  Go back to Homepage
                </Link>
                <a
                  className="inline-block w-full rounded-l-xl rounded-t-xl bg-white px-6 py-2 font-bold leading-loose hover:bg-gray-50 lg:w-auto"
                  href="#"
                >
                  Try Again
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="skew skew-bottom mr-for-radius">
          <svg
            className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 0 10" />
          </svg>
        </div>
        <div className="skew skew-bottom ml-for-radius">
          <svg
            className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 10 10" />
          </svg>
        </div>
      </section>
    </>
  );
}
export default React.memo(PageNotFound);
