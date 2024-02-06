import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";

function VariantC({ caption, title, team }: TeamsProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-xl text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="flex flex-wrap">
            {team &&
              team.map((member) => (
                <div
                  className="mb-6 w-full px-3 md:w-1/2 lg:w-1/3"
                  key={member?.name}
                >
                  <div className="w-full overflow-hidden rounded bg-white pb-8 text-center shadow">
                    {member.mainImage?.image && (
                      <div>
                        <Image
                          className="mb-8 h-[345px] w-full object-cover"
                          sizes="100vw"
                          src={urlFor(member?.mainImage?.image)}
                          width={345}
                          height={256}
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                        />
                      </div>
                    )}
                    <p className="font-heading mb-2 text-2xl font-bold">
                      {member?.name}
                    </p>
                    <p className="text-gray-500">{member?.jobTitle}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
