import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { StatsProps } from ".";

function VariantB({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {stats && (
          <div className="sm:justify-left mx-10 items-center sm:-mx-4 sm:flex sm:flex-wrap">
            {stats?.map((stat, index) => (
              <div
                className="my-8 flex w-full items-center px-4 md:w-1/2 lg:w-1/4 lg:justify-center"
                key={index}
              >
                {stat?.mainImage?.image && (
                  <div className="mr-4 inline-block rounded bg-webriq-lightblue p-4">
                    <Image
                      src={urlFor(stat?.mainImage?.image)}
                      width={24}
                      height={24}
                      quality={100}
                      alt={stat?.mainImage?.alt ?? "statistics-icon"}
                    />
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold">{stat?.value}</p>
                  <p className="text-gray-500">{stat?.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantB);
