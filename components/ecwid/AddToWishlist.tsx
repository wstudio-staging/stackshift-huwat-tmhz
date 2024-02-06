import { useEcwid } from "context/EcwidContext";
import React, { useEffect } from "react";
import { TypedObject } from "sanity";
import _ from "lodash";
import { EcwidTypes } from "context/_ecwid-types";

interface AddToWishlistProps {
  children?: React.ReactNode;
  classNames?: string;
  product?:
    | EcwidTypes["products"]
    | {
        name: string;
        ecwidProductId: number;
        price: string;
        description: TypedObject | TypedObject[] | null;
      };
  containerClass?: string;
}

const AddToWishlist = ({
  children,
  classNames,
  product,
  containerClass = "w-1/6",
}: AddToWishlistProps) => {
  const ecwid = useEcwid();
  const { addWishlist, setId, favorited } = ecwid;

  const productId =
    product && "id" in product ? product?.id : product?.ecwidProductId;

  useEffect(() => {
    setId(productId);
  }, [productId, setId]);

  return (
    <>
      <div className={favorited ? "w-full" : containerClass}>
        <button
          onClick={() => addWishlist(productId)}
          className={classNames}
          type="button"
        >
          {!favorited ? (
            children
          ) : (
            <>
              <svg
                className="h-6 w-6"
                width={27}
                height={27}
                viewBox="0 0 27 27"
                fill="#c52965"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z"
                  stroke="#c52965"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-heading ml-1 mt-1 font-bold uppercase">
                Remove from wishlist
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default AddToWishlist;
