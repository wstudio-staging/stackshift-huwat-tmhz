import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TeamsProps } from ".";

function VariantB({ team }: TeamsProps) {
  const [activeTab, setActiveTab] = React.useState(team?.[0]?.name); // default active tab is the first tab

  const filterMember = team?.filter((member) => member?.name === activeTab);

  return (
    <section>
      {team && (
        <div className="radius-for-skewed bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="-mx-3 flex flex-wrap items-center">
              <div className="mb-8 w-full px-3 lg:mb-0 lg:w-1/3">
                <ul className="flex flex-row flex-wrap justify-center space-x-6 lg:flex-col lg:justify-start lg:space-x-0">
                  {team &&
                    team?.map((item) => (
                      <li key={item?.name}>
                        <button
                          aria-label={item.name}
                          className={`mb-4 text-2xl lg:text-4xl ${
                            item?.name === activeTab
                              ? "text-gray-900"
                              : "text-gray-500"
                          } font-bold hover:text-gray-500 focus:outline-none`}
                          onClick={() => setActiveTab(item?.name)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              {team && (
                <div className="w-full px-3 lg:w-2/3">
                  {filterMember?.map((member, index) => (
                    <div className="flex bg-white p-6 shadow" key={index}>
                      {member?.mainImage?.image && (
                        <Image
                          className="overflow-hidden rounded-lg object-cover"
                          src={urlFor(member?.mainImage?.image)}
                          sizes="100vw"
                          width={329}
                          height={494}
                          alt={
                            member?.mainImage?.alt ??
                            `team-member-${member?.name}-profile-image`
                          }
                        />
                      )}
                      <div className="order-last mt-6 w-1/2 pl-6 pt-6">
                        <p className="font-heading text-2xl font-bold">
                          {member?.name}
                        </p>
                        <p className="mb-6 text-gray-500">{member?.jobTitle}</p>
                        <p className="mb-6 text-justify text-gray-500">
                          {member?.plainText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default React.memo(VariantB);
