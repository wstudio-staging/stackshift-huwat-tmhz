import { memo, useEffect } from "react";
import { urlFor, PortableText } from "lib/sanity";
import Image from "next/image";
import AddToBag from "components/ecwid/AddToBag";
import AddToWishlist from "components/ecwid/AddToWishlist";
import Ribbon from "components/ecwid/Ribbon";
import ProductDetail from "components/ecwid/ProductDetail";
import { useEcwid } from "context/EcwidContext";
import { defaultBlockStyle } from "helper";
import { PagesProductInfoProps } from ".";

function VariantB({ products }: PagesProductInfoProps) {
  const ecwid = useEcwid();

  const ecwidProduct = ecwid?.products;

  useEffect(() => {
    if (products?.ecwidProductId) {
      ecwid.setId(products.ecwidProductId);
    }
  }, [ecwid, products?.ecwidProductId]);

  return (
    <section className="sm:p-10 md:p-20">
      <div className="container mx-auto px-4">
        {products && (
          <div className="-mx-4 flex flex-wrap">
            <div className="mb-8 w-full px-4 md:mb-0 md:w-1/2">
              <div className="-mx-1 flex flex-wrap">
                <div className="px-5 md:w-full">
                  <div className="relative">
                    {products?.productInfo?.images ? (
                      <div className="h-full w-full">
                        <Image
                          sizes="(min-width: 1840px) 704px, (min-width: 1540px) calc(27.86vw + 197px), (min-width: 1320px) calc(30vw + 120px), (min-width: 1260px) calc(145vw - 1379px), (min-width: 1040px) 36vw, (min-width: 980px) 320px, (min-width: 780px) calc(41.11vw - 75px), (min-width: 640px) calc(66.67vw + 69px), calc(100vw - 64px)"
                          width={736}
                          height={564}
                          src={urlFor(
                            products?.productInfo?.images?.[0]?.image
                          )}
                          style={{
                            objectFit: "cover",
                          }}
                          alt={
                            products?.productInfo?.images?.[0]?.alt ??
                            "product-info-main-image"
                          }
                        />
                      </div>
                    ) : (
                      <Image
                        className="object-cover"
                        sizes="(min-width: 1840px) 704px, (min-width: 1540px) calc(27.86vw + 197px), (min-width: 1320px) calc(30vw + 120px), (min-width: 1260px) calc(145vw - 1379px), (min-width: 1040px) 36vw, (min-width: 980px) 320px, (min-width: 780px) calc(41.11vw - 75px), (min-width: 640px) calc(66.67vw + 69px), calc(100vw - 64px)"
                        width={736}
                        height={564}
                        src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                        alt="default image for product"
                      />
                    )}
                  </div>
                </div>
                <div className="mr-auto mt-8 px-5">
                  <div className="flex flex-wrap items-center">
                    <span className="font-heading mr-8 font-bold uppercase">
                      SHARE IT
                    </span>
                    {products?.productInfo?.socialLinks?.map(
                      (social, index) =>
                        social?.socialMediaLink && (
                          <a
                            aria-label={
                              social?.socialMedia || social?.socialMediaPlatform
                            }
                            className="mr-2 h-8 w-8"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={social?.socialMediaLink}
                            key={index}
                          >
                            {social?.socialMedia === "facebook" ? (
                              <svg
                                className=""
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                />
                              </svg>
                            ) : social?.socialMedia === "twitter" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                />
                              </svg>
                            ) : social?.socialMedia === "instagram" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0045d8"
                                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                />
                              </svg>
                            ) : (
                              social?.socialMediaIcon?.image && (
                                <Image
                                  src={urlFor(social?.socialMediaIcon?.image)}
                                  width={32}
                                  height={32}
                                  quality={100}
                                  alt={
                                    social?.socialMediaIcon?.alt ??
                                    "contact-socialMedia-icon"
                                  }
                                />
                              )
                            )}
                          </a>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div>
                <div className="mb-10 border-b pb-10">
                  {products?.ecwidProductId && (
                    <div className="mb-3">
                      <Ribbon data={ecwidProduct} />
                    </div>
                  )}
                  {products?.name && (
                    <h1 className="font-heading mb-6 mt-2 max-w-xl text-5xl font-bold md:text-6xl">
                      {products?.name}
                    </h1>
                  )}
                  <div className="mb-8">{/* Add product rating here */}</div>
                  {products?.price && (
                    <p
                      className={`font-heading inline-block text-2xl font-bold text-webriq-darkblue ${
                        !products?.compareToPrice && "mb-8"
                      }`}
                    >
                      {(ecwid &&
                        ecwid?.products?.defaultDisplayedPriceFormatted) ||
                        ecwid?.getPriceDisplay(products?.price)}
                    </p>
                  )}
                  {products?.compareToPrice && (
                    <p
                      className="mt-3 mb-8 text-gray-500"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      Before{" "}
                      <span className="line-through">
                        {ecwidProduct?.compareToPriceFormatted}
                      </span>{" "}
                      (
                      <span
                        className="text-webriq-babyblue"
                        style={{ fontSize: "15px" }}
                      >
                        Save{" "}
                        {ecwidProduct?.compareToPriceDiscountPercentFormatted}
                      </span>
                      )
                    </p>
                  )}
                  {products?.description && (
                    // <p
                    //   dangerouslySetInnerHTML={{
                    //     __html: products?.description,
                    //   }}
                    // />
                    <PortableText
                      value={products?.description}
                      components={defaultBlockStyle}
                    />
                  )}
                </div>

                <ProductDetail product={ecwidProduct}>
                  <div className="my-8 flex items-start gap-4 flex-row">
                    <div className="w-full lg:mb-4 xl:mb-0">
                      <AddToBag
                        inStock={!ecwidProduct?.inStock}
                        classNames="block w-full mb-4 lg:mb-0 text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200 bg-webriq-darkblue hover:bg-webriq-blue cursor-pointer"
                      >
                        {products?.productInfo?.btnLabel ?? "ADD TO CART"}
                      </AddToBag>
                    </div>
                    <AddToWishlist
                      classNames="w-full flex-shrink-0 flex flex-wrap items-center justify-center py-5 px-8 rounded-md border hover:border-webriq-darkblue"
                      product={ecwidProduct}
                      containerClass="w-full"
                    >
                      <svg
                        className="-mt-1 mr-2"
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
                      <span className="font-heading font-bold uppercase">
                        Add to wishlist
                      </span>
                    </AddToWishlist>
                  </div>
                </ProductDetail>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantB);
