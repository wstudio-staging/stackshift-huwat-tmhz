import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";

function VariantD({ caption, title, team }: TeamsProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-xl text-center lg:mb-16">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="-mx-4 flex flex-wrap">
            {team &&
              team.map((member, index) => (
                <div className="mb-6 w-full px-4 lg:w-1/2" key={index}>
                  <div className="items-center overflow-hidden rounded bg-white shadow sm:flex sm:flex-wrap lg:block xl:flex">
                    {member.mainImage?.image && (
                      <div>
                        <Image
                          className="h-[320px] w-full object-cover sm:w-[179px] lg:w-full xl:w-[179px]"
                          sizes="100vw"
                          src={urlFor(member?.mainImage?.image)}
                          width={179}
                          height={320}
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                        />
                      </div>
                    )}
                    <div className="p-4 sm:w-2/3 lg:w-full lg:pl-6 xl:w-2/3">
                      <p className="font-heading mb-2 text-2xl font-bold">
                        {member?.name}
                      </p>
                      <p className="mb-4 leading-loose text-gray-500">
                        {member?.plainText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
