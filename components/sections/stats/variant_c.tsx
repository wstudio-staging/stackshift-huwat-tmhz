import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { StatsProps } from ".";

function VariantC({ stats }: StatsProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {stats && (
          <div className="flex flex-wrap items-center text-center">
            {stats?.map((stat, index) => (
              <div className="my-8 w-full md:w-1/2 lg:w-1/4" key={index}>
                {stat?.mainImage?.image && (
                  <div className="mx-auto inline-block rounded bg-webriq-lightblue p-4">
                    <Image
                      src={urlFor(stat?.mainImage?.image)}
                      width={24}
                      height={24}
                      quality={100}
                      alt={stat?.mainImage?.alt ?? "statistics-icon"}
                    />
                  </div>
                )}
                <p className="mt-4 text-2xl font-bold">{stat?.value}</p>
                <p className="text-gray-500">{stat?.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantC);
