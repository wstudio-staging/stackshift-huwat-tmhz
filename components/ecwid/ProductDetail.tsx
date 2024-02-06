import { useEcwid } from "context/EcwidContext";
import React, { useEffect, useMemo, useState } from "react";
import { TypedObject } from "sanity";
import AddMoreButton from "./AddMoreButton";
import ViewWishlist from "./ViewWishlist";
import ItemInBag from "./ItemInBag";
import { isEmpty } from "lodash";

import { EcwidTypes } from "context/_ecwid-types";

interface ProductDetailProps {
  product:
    | EcwidTypes["products"]
    | {
        id: number;
        name: string;
        ecwidProductId: number;
        compareToPrice: number;
        price: string;
        description: TypedObject | TypedObject[] | null;
        defaultDisplayedPrice: number;
        options: {
          type: string;
          name: string;
          nameTranslated: any;
          choices: {
            text: string;
            textTranslated: any;
            priceModifier: number;
            priceModifierType: string;
          }[];
          defaultChoice: number;
          required: boolean;
        }[];
      };

  children: React.ReactNode;
}

const ProductDetail = ({ product, children }: ProductDetailProps) => {
  const productId = product?.id ? product?.id : product?.ecwidProductId;

  if (!productId) return null;

  const ecwid = useEcwid();
  const addToBag = ecwid?.addToBag;
  const options = ecwid?.options;
  const selected = ecwid?.selected;
  const setOptions = ecwid?.setOptions;
  const setPrice = ecwid?.setPrice;
  const setSelectedOpt = ecwid?.setSelectedOpt;
  const getPriceDisplay = ecwid?.getPriceDisplay;

  // const cart = ecwid?.cart;
  const favorited = ecwid.favorited;
  const addtowishlist = ecwid.addWishlist;

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      try {
        Ecwid.Cart.get(function (cart) {
          setCart(cart);
        });
        Ecwid.OnCartChanged.add(function (cart) {
          setCart(cart);
        });
      } catch (error) {
        console.error();
      }
    }
  }, [ecwid]);

  useEffect(() => {
    setPrice(product?.defaultDisplayedPrice);
  }, [product?.defaultDisplayedPrice, setPrice]);

  useEffect(() => {
    if (productId) {
      let data = {};

      product?.options?.forEach((option) => {
        if (option?.choices && typeof option?.defaultChoice !== "undefined") {
          data[option?.name] = option?.choices[option?.defaultChoice]?.text;
        }
      });

      // setOptions(data);
    }
  }, [product?.options, productId, setOptions]);

  useEffect(() => {
    if (options && Object.keys(options).length) {
      let priceModifier = 0;
      let basePrice = product?.defaultDisplayedPrice;

      if (selected?.defaultDisplayedPrice && options?.Size !== "") {
        basePrice = selected?.defaultDisplayedPrice;
      }

      Object.entries(options).forEach((element) => {
        const key = element[0];
        const value = element[1];

        const selectedOption = product?.options?.find((el) => el?.name === key);

        if (selectedOption) {
          if (selectedOption?.choices && selectedOption?.choices?.length) {
            const selectedChoice = selectedOption?.choices?.find(
              (el) => el.text === value
            );
            if (selectedChoice) {
              priceModifier += selectedChoice?.priceModifier;
            }
          }
        }
      });

      setPrice(basePrice + priceModifier);
    }
  }, [
    options,
    product?.defaultDisplayedPrice,
    product?.options,
    selected?.defaultDisplayedPrice,
    selected?.sku,
    setPrice,
  ]);

  const itemsCount = useMemo(() => {
    let count = 0;
    if (cart?.items?.length) {
      const item = cart?.items?.filter((el) => el.product.id === productId);
      if (item?.length) {
        item?.forEach((element) => {
          count += element.quantity;
        });
      }
    }
    return count;
  }, [cart?.items, productId]);

  const handleChanged = (option, choice, event) => {
    if (option?.type === "TEXTFIELD" || option?.type === "SELECT") {
      setOptions((prev) => ({
        ...prev,
        [option?.name]: event?.target?.value,
      }));

      setSelectedOpt((prev) => [
        ...prev.filter((item) => item.name !== option.name),
        { name: option.name, value: event?.target?.value },
      ]);
    } else if (option?.type === "RADIO" || option?.type === "SIZE") {
      setOptions((prev) => ({ ...prev, [option?.name]: choice.text }));

      setSelectedOpt((prev) => [
        ...prev.filter((item) => item.name !== option.name),
        { name: option.name, value: choice?.text },
      ]);
    } else if (option?.type === "CHECKBOX") {
      if (event?.target?.checked) {
        setOptions((prev) => ({
          ...prev,
          [option?.name]:
            prev[option?.name] && prev[option?.name]?.length
              ? [...prev[option?.name], choice?.text]
              : [choice?.text],
        }));

        setSelectedOpt((prev) => [
          ...prev.filter((item) => item.name !== option.name),
          {
            [option?.name]:
              prev[option?.name] && prev[option?.name]?.length
                ? [...prev[option?.name], choice?.text]
                : [choice?.text],
          },
        ]);
      } else {
        setOptions((prev) => ({
          ...prev,
          [option?.name]: prev[option?.name]?.filter(
            (el) => el !== choice?.text
          ),
        }));

        setSelectedOpt((prev) => [
          ...prev.filter((item) => item.name !== option.name),
          {
            [option?.name]: prev[option?.name]?.filter(
              (el) => el !== choice?.text
            ),
          },
        ]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToBag({ id: productId, quantity }, options);
  };

  const handleQuantityInput = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || !inputValue) {
      setQuantity(1);
    } else {
      setQuantity(inputValue);
    }
  };

  const isNegative = (num) => {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {product?.options?.map((option, index) => {
          const value = !isEmpty(options) ? options[option?.name] : "";
          if (option?.type === "TEXTFIELD") {
            return (
              <div key={index} className="mb-4 flex flex-col">
                <label
                  htmlFor={index}
                  className="mb-2 font-medium uppercase text-gray-900"
                >
                  {option?.name}
                </label>
                <input
                  type="text"
                  name={`name_${option?.name}`}
                  id={index}
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                  required={option?.required}
                  value={value}
                  onChange={(e) => handleChanged(option, null, e)}
                />
              </div>
            );
          }

          if (option?.type === "SELECT") {
            return (
              <div key={index} className="mb-4 flex flex-col w-full">
                <label
                  htmlFor={index}
                  className="mb-2 font-medium uppercase text-gray-900"
                >
                  {option?.name}
                </label>
                <select
                  name={`name_${option?.name}`}
                  id={index}
                  //style={{ maxWidth: "420px" }}
                  className="focus:shadow-outline block appearance-none rounded border border-gray-400 bg-white px-4 py-3 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                  required={option?.required}
                  value={value}
                  onChange={(e) => handleChanged(option, null, e)}
                >
                  <option value="">Please choose</option>
                  {option?.choices?.map((choice, ii) => (
                    <option key={ii} value={choice?.text}>
                      {choice?.text}{" "}
                      {choice?.priceModifier > 0
                        ? isNegative(choice?.priceModifier)
                          ? `(-${getPriceDisplay(
                              Math.abs(choice?.priceModifier)
                            )})`
                          : `(+${getPriceDisplay(choice?.priceModifier)})`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (option?.type === "RADIO") {
            return (
              <div key={index} className="mb-4">
                <p className="mb-2 font-medium text-gray-900">{option?.name}</p>
                {option?.choices?.map((choice, ii) => (
                  <div className="flex items-center" key={ii}>
                    <input
                      id={choice?.text}
                      type="radio"
                      name={`name_${option?.name}`}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2  focus:ring-blue-500 "
                      required={option?.required}
                      checked={value === choice?.text}
                      onChange={(e) => handleChanged(option, choice, e)}
                    />
                    <label
                      htmlFor={choice?.text}
                      className="ml-2 font-medium text-gray-900"
                    >
                      {choice?.text}{" "}
                      {choice?.priceModifier > 0
                        ? isNegative(choice?.priceModifier)
                          ? `(-${getPriceDisplay(
                              Math.abs(choice?.priceModifier)
                            )})`
                          : `(+${getPriceDisplay(choice?.priceModifier)})`
                        : ""}
                    </label>
                  </div>
                ))}
              </div>
            );
          }

          if (option?.type === "SIZE") {
            return (
              <div className="flex w-full" key={index}>
                <p className="mb-2 font-medium uppercase text-gray-900">
                  {option.name}
                </p>
                <ul className="flex-wrap space-x-4">
                  {option?.choices?.map((choice, ii) => (
                    <li key={ii} className="mb-4">
                      <input
                        id={choice?.text}
                        type="radio"
                        name={`name_${option?.name}`}
                        className="peer hidden"
                        required={option?.required}
                        checked={value === choice?.text}
                        onChange={(e) => handleChanged(option, choice, e)}
                      />
                      <label
                        htmlFor={choice?.text}
                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:peer-checked:text-blue-500"
                      >
                        <div className="block">
                          <div className="text-md w-full font-semibold">
                            {choice?.text}{" "}
                            {choice?.priceModifier > 0
                              ? isNegative(choice?.priceModifier)
                                ? `(-${getPriceDisplay(
                                    Math.abs(choice?.priceModifier)
                                  )})`
                                : `(+${getPriceDisplay(choice?.priceModifier)})`
                              : ""}
                          </div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          if (option?.type === "CHECKBOX") {
            return (
              <div key={index} className="mb-4">
                <p className="mb-2 font-medium uppercase text-gray-900">
                  {option?.name}
                </p>
                {option?.choices?.map((choice, ii) => (
                  <div className="flex items-center" key={ii}>
                    <input
                      id={choice?.text}
                      type="checkbox"
                      name={`name_${option?.name}`}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2  focus:ring-blue-500 "
                      required={option?.required}
                      checked={Boolean(value.includes(choice?.text))}
                      onChange={(e) => handleChanged(option, choice, e)}
                    />
                    <label
                      htmlFor={choice?.text}
                      className="ml-2 font-medium text-gray-900"
                    >
                      {choice?.text}{" "}
                      {choice?.priceModifier > 0
                        ? isNegative(choice?.priceModifier)
                          ? `(-${getPriceDisplay(
                              Math.abs(choice?.priceModifier)
                            )})`
                          : `(+${getPriceDisplay(choice?.priceModifier)})`
                        : ""}
                    </label>
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        <div className="mb-4 flex flex-col">
          <label
            htmlFor="quantity"
            className="mb-2 font-medium uppercase text-gray-900"
          >
            Qty
          </label>
          <div className="flex w-full flex-row rounded border border-gray-400 shadow hover:border-gray-500 justify-between">
            <button
              className="text-gray-400 text-xl w-[44px] h-[44px] flex items-center justify-center"
              type="button"
              onClick={() => setQuantity((prev) => prev - 1)}
              disabled={quantity === 1 ? true : false}
            >
              -
            </button>
            <input
              type="text"
              name="quantity"
              id="quantity"
              className="focus:shadow-outline bg-white text-center focus:outline-none"
              value={quantity}
              onChange={handleQuantityInput}
              required
            />
            <button
              className="text-gray-400 text-xl w-[44px] h-[44px] flex items-center justify-center"
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        {itemsCount > 0 && <ItemInBag itemsCount={itemsCount} />}

        {itemsCount === 0 ? (
          children
        ) : (
          <div className="mt-4">
            <AddMoreButton
              {...{ itemsCount, favorited, addtowishlist, product }}
            />
          </div>
        )}
      </form>
      {favorited && (
        <div className="mt-4">
          <ViewWishlist />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
