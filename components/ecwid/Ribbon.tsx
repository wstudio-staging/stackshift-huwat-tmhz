import { EcwidTypes } from "context/_ecwid-types";
import React from "react";

const Ribbon = ({ data }: { data: EcwidTypes["products"] }) => {
  if (!data) return null;

  if (data.inStock === null) {
    return <p className="inline-block bg-red-400 p-2 text-white">Error</p>;
  }
  if (!data.inStock) {
    return <p className="inline-block bg-red-400 p-2 text-white">SOLD OUT</p>;
  }

  if (data?.ribbon?.text) {
    return (
      <p
        className="inline-block p-2 text-white"
        style={{ backgroundColor: data?.ribbon?.color }}
      >
        {data?.ribbon?.text}
      </p>
    );
  }

  return null;
};

export default Ribbon;
