import React from "react";
import Link from "next/link";

function ThankYouForm() {
  return (
    <>
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
              <p className="mb-10 text-4xl font-bold text-webriq-darkblue">
                Success!
              </p>
              <h4 className="mb-10 text-4xl font-bold">
                Thank you for your response
              </h4>
              <div>
                <Link
                  className="mb-2 inline-block w-full rounded-l-xl rounded-t-xl bg-webriq-blue px-6 py-2 font-bold leading-loose text-gray-50 hover:bg-webriq-darkblue lg:mb-0 lg:mr-4 lg:w-auto"
                  href="/"
                >
                  Go back to Homepage
                </Link>
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
export default React.memo(ThankYouForm);
