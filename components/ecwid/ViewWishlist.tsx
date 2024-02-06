import { useEcwid } from "context/EcwidContext";
import React from "react";
import Link from "next/link";

const ViewWishlist = () => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <div className="flex flex-row gap-x-4 ">
        <Link
          className="font-heading block w-full rounded-md border px-8 py-5 text-center font-bold uppercase transition duration-200 hover:border-webriq-darkblue"
          href="/wishlist"
        >
          View Wishlist
        </Link>
      </div>
    </>
  );
};

export default ViewWishlist;
