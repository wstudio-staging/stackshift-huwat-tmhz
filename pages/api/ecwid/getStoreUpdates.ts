// this will return the response from the Ecwid store events web hook
import { baseUrl, requestHeaders, secret, siteUrl } from "utils/ecwid/config";
import { sanityClient } from "lib/sanity.client";
import fetch from "node-fetch";
import _ from "lodash";

export default async (req, res) => {
  const storeId = req?.body?.storeId;
  const orderId = req?.body?.data?.orderId;

  const { eventType } = req?.body;

  let maxRetryPromise = 3;

  console.log("[INFO] Store event data: ", req.body);

  if (["order.created", "order.updated"].includes(eventType)) {
    try {
      if (orderId && storeId) {
        console.log("[INFO] Fetching details from this order...");

        // Get order item details using the storeId and orderId
        const orderItems = await fetch(
          `${baseUrl}/${storeId}/orders/${orderId}`,
          {
            method: "GET",
            headers: requestHeaders,
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(
              `[INFO] Successfully fetched order# ${orderId} from Ecwid.`
            );

            return response?.items;
          });

        if (orderItems && orderItems?.length !== 0) {
          const productIds = orderItems?.map((item) =>
            item?.productId.toString()
          );

          const skuId = orderItems?.map((item) => item.sku.toString());

          if (productIds && productIds?.length !== 0) {
            console.log(
              `[INFO] Checking if ${productIds} is/are product bundle/s in studio...`
            );

            // Check if these productIds are in Sanity Studio but only return those which are product bundles and their products
            const studioBundleProducts = await sanityClient
              .fetch(
                `*[_type=="products" && pid in $productIds && !(_id in path("drafts.**")) && isProductBundle == true] {
                  ...,
                  productsIsInBundle[]->,
                  "productsInBundleIds": productsIsInBundle[]->pid
                }`,
                { productIds: productIds }
              )
              .then((response) => {
                if (response.length !== 0) {
                  console.log(
                    `[INFO] Retrieved product bundle and its products.`
                  );
                } else {
                  console.log(
                    `[INFO] This is not a product bundle. No products to retrieve.`
                  );
                }

                return response;
              });

            // console.log("studioBundleProducts", studioBundleProducts);

            if (studioBundleProducts.length > 0) {
              const getProductSku = orderItems?.flatMap((items) => {
                return items?.selectedOptions?.flatMap((options) => {
                  return {
                    id: items?.productId,
                    quantity: items?.quantity,
                    selectedOptions: items?.selectedOptions,
                    orderSKU: items?.sku,
                    sku: options?.value
                      .split(" ")
                      .pop()
                      .replace(/[\(\)']+/g, ""),
                  };
                });
              });

              const getproductBySku = await Promise.all(
                getProductSku.map(async (prod) => {
                  return await fetch(
                    baseUrl +
                      `/${storeId}/products?sku=${prod?.sku.toString()}`,
                    {
                      method: "GET",
                      headers: requestHeaders,
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      return data.items.map((item) => {
                        let variantCombination = prod.selectedOptions?.flatMap(
                          (opt, idx) => {
                            let prodCombinations = item?.combinations?.find(
                              (combi) => combi?.sku === prod?.sku
                            );

                            return {
                              id: prodCombinations?.id,
                              orderSKU: prod?.orderSKU,
                              name: prodCombinations?.options
                                .map(({ name }) => name)
                                .toString(),
                              type: opt?.type,
                              selections: [
                                {
                                  selectionModifier: 0,
                                  selectionModifierType: "ABSOLUTE",
                                  selectionTitle: prodCombinations?.options
                                    .map(({ value }) => value)
                                    .toString(),
                                },
                              ],
                              value: prodCombinations?.options
                                .map(({ value }) => value)
                                .toString(),
                              valuesArray: prodCombinations?.options?.map(
                                ({ value }) => value
                              ),
                            };
                          }
                        )[0];

                        return {
                          orderSKU: variantCombination?.orderSKU,
                          productId: item?.id,
                          name: item?.name,
                          sku: prod?.sku,
                          price: 0,
                          quantity: prod?.quantity,
                          selectedOptions: [
                            {
                              name: variantCombination?.name,
                              selections: variantCombination?.selections,
                              value: variantCombination?.value,
                              valuesArray: variantCombination?.valuesArray,
                              type: variantCombination?.type,
                            },
                          ],
                          combinationId: variantCombination
                            ? variantCombination?.id
                            : null,
                        };
                      });
                    });
                })
              );

              // console.log(
              //   "getproductBySku",
              //   _.groupBy(getproductBySku.flat(), "orderSKU")
              // );

              const studioBundles =
                studioBundleProducts &&
                studioBundleProducts.length > 0 &&
                (
                  await Promise.all(
                    studioBundleProducts.flatMap(async (products) => {
                      const product = await fetch(
                        baseUrl +
                          `/${storeId}/products?productId=${products.productsInBundleIds.toString()}`,
                        {
                          method: "GET",
                          headers: requestHeaders,
                        }
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          data.items.flatMap((item) => {
                            return {
                              id: item.id,
                              name: item.name,
                              sku: item.sku,
                              options: item.options,
                              combinations: item.combinations,
                            };
                          })
                        );

                      return {
                        id: products.pid,
                        products: product,
                      };
                    })
                  )
                ).flat();

              // console.log("studioBundles", studioBundles);

              const newOrderArray = orderItems.filter(
                (item) => item.price !== 0
              );

              console.log(
                "Reset order items without bundle products",
                newOrderArray.length
              );

              const groupBySku = _.groupBy(getproductBySku.flat(), "orderSKU");

              let newArrayItems = [];
              newOrderArray &&
                newOrderArray.map((items) => {
                  let productskuList = [];
                  let productList = [];

                  const studioProducts = studioBundles.find(
                    (prod) => +prod.id === items.productId
                  )?.products;

                  groupBySku[items?.sku]?.map((item) =>
                    productskuList.push({
                      productId: item?.productId,
                      name: item.name,
                      sku: item.sku,
                      price: item.price,
                      quantity: item?.quantity,
                      selectedOptions: item.selectedOptions,
                      combinationId: item.combinationId,
                    })
                  );

                  studioProducts?.map((prods) =>
                    productList?.push({
                      productId: prods?.id,
                      name: prods?.name,
                      sku: prods?.sku,
                      price: 0,
                      quantity: items?.quantity,
                    })
                  );

                  return newArrayItems.push(
                    items,
                    ...productskuList,
                    ...productList
                  );
                });

              console.log(
                "Checking newArrayItems length..",
                newArrayItems.length
              );

              if (
                studioBundles.length > 0 &&
                newArrayItems &&
                newArrayItems.length > 0
              ) {
                const updateOrder = await fetch(
                  `https://app.ecwid.com/api/v3/${storeId}/orders/${orderId}`,
                  {
                    method: "PUT",
                    headers: requestHeaders,
                    body: JSON.stringify({
                      items: newArrayItems,
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((result) => result);

                return res.status(200).json(updateOrder);
              } else {
                return res.status(200).json({ message: "nothing change " });
              }
            } else {
              return res.status(200).json({ message: "nothing change " });
            }
          }
        }
      }
    } catch (error) {
      console.log("[ERROR] Something went wrong... ", error);
      return res.status(400).send(error);
    }
  }

  return res.status(200).send({ message: "OK" });
};

/**
 *
 * @param {*} maxRetry - the max number of retries for promises with "rejected" status
 * @param {*} arrayOfPromises - the array of promise requests to adjust inventory per product ID
 *
 */
async function retryPromise(maxRetry, arrayOfPromises) {
  let results;

  for (let retry = 0; retry < maxRetry; retry++) {
    let promiseArray;

    if (!results) {
      // On first run, we don't have value assigned to "results" variable yet so pass prop "arrayOfPromises" as initial value
      promiseArray = arrayOfPromises.map((promise) => promise);
    } else {
      // Something went wrong so we retry the function here
      promiseArray = results?.map(
        (promise, index) =>
          promise?.status === "fulfilled"
            ? promise // if the promise has returned a "fulfilled" status then return promise
            : arrayOfPromises[index] // otherwise if the promise returned "rejected" status, run the promise that failed
      );
    }

    results = await Promise.allSettled(promiseArray);

    // To avoid unnecessary loops, if TRUE or all promises have status "fulfilled" then exit loop and return the results
    if (results?.every((promise) => promise?.status === "fulfilled")) {
      return results;
    } // otherwise, loop once again per maxRetry number of iterations
  }

  // after loop ends per maxRetry, return the final results
  return results;
}

/**
 *
 * @param {*} data - { productId, action, quantityDelta }
 *
 */
async function adjustInventoryRequest(data) {
  return fetch(`${siteUrl}/api/ecwid/adjustInventory`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: secret,
    },
    body: JSON.stringify({
      productId: data?.productId,
      action: data?.action,
      quantity: data?.quantity,
    }),
  });
}
