import React from "react";
import Image from "next/image";
import Link from "next/link";

function NoPreview() {
  return (
    <section>
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto">
            <Image
              layout="responsive"
              width={854}
              height={312}
              objectFit="contain"
              src="https://cdn.sanity.io/images/9itgab5x/production/8f90c590ada0a2f3c89c35535c323320627b9622-554x312.png"
              alt="no-preview-image"
            />
          </div>
          <div className="text-center">
            <span className="mb-6 text-4xl font-bold text-webriq-darkblue">
              Whoops!
            </span>
            <p className="my-8 text-gray-700">
              Publish your page first to preview LIVE site
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(NoPreview);
