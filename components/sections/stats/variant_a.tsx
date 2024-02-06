import React from "react";

import { StatsProps } from ".";

function VariantA({ stats }: StatsProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="justify-left -mx-4 flex flex-wrap items-center text-center">
          {stats &&
            stats.map((items, index) => (
              <div
                className="my-8 w-full px-4 sm:w-1/4 md:w-1/2 lg:w-1/4"
                key={index}
              >
                <div className="relative rounded bg-white py-10 shadow">
                  <p className="mb-1 text-webriq-darkblue">{items?.label}</p>
                  <span className="text-3xl font-bold lg:text-4xl">
                    {items?.value}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
