import React from "react";

const Description = ({ data }) => {
  if (!data) return null;

  if (data?.description) {
    return (
      <div
        className="font-custom max-w-md text-gray-500"
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      ></div>
    );
  }

  return null;
};

export default Description;
