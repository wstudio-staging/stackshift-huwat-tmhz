import { definePreview } from "next-sanity/preview";
import { config } from "./config";

export const usePreview = definePreview({
  ...config,
  // We are ommitting the onPublicAccessOnly function here so it'll not throw an error since we're using generated tokens
  // onPublicAccessOnly,
});
