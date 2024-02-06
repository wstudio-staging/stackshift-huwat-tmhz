export const baseUrl = "https://app.ecwid.com/api/v3";

export const secret = "secret_9ec4733d9a1d3bf7656d02a74a54483b";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const storeId = process.env.NEXT_PUBLIC_ECWID_STORE_ID;

export const requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ECWID_SECRET_TOKEN}`,
};