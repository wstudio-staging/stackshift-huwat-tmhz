import { useEcwid } from "context/EcwidContext";
import React from "react";
import AddToWishlist from "./AddToWishlist";
import { EcwidTypes } from "context/_ecwid-types";

interface AddMoreButtonProps {
  product:
    | EcwidTypes["products"]
    | {
        name: string;
        ecwidProductId: number;
        price: string;
        description: string;
      };
}

const AddMoreButton = ({ product }: AddMoreButtonProps) => {
  const ecwid = useEcwid();
  const isAddingToBag = ecwid?.isAddingToBag;

  return (
    <>
      <div className="flex flex-col gap-y-4 ">
        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
          <div className="w-full">
            <button
              type="submit"
              className="font-heading block w-full rounded-md border border-webriq-darkblue px-8 py-5 text-center font-bold uppercase text-webriq-darkblue transition duration-200"
              disabled={isAddingToBag}
            >
              {isAddingToBag ? "Adding..." : "Add More"}
            </button>
          </div>

          <AddToWishlist
            classNames="ml-auto sm:ml-0 flex-shrink-0 inline-flex items-center justify-center w-full h-16 rounded-md border hover:border-webriq-darkblue"
            product={product}
          >
            <svg
              className="h-6 w-6"
              width={27}
              height={27}
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </AddToWishlist>
        </div>

        <a
          className="font-heading block w-full rounded-md bg-webriq-darkblue px-8 py-5 text-center font-bold uppercase text-white transition duration-200"
          href="/cart?store-page=cart"
        >
          Go to Checkout
        </a>
      </div>
    </>
  );
};

export default AddMoreButton;
