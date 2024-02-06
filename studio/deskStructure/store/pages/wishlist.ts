import type { SanityDocument } from "sanity";
import { StructureBuilder } from "sanity/desk";

import { EditIcon, EyeOpenIcon, EarthGlobeIcon } from "@sanity/icons";
import { MdAccessibility } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import Iframe from "sanity-plugin-iframe-pane";

import resolveProductionUrl from "../../../resolvePreviewUrl";
import SeoPreviews from "../../../components/previews/seo/SeoPreviews";
//import BraillePreview from "../../../components/previews/a11y/braille/Braille/Braille"
//import ColorblindPreview from "../../../components/previews/a11y/colorblind-filter/ColorblindPreview"
//import TextToSpeechPreview from "../../../components/previews/a11y/text-to-speech/TextToSpeechPreview"

import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_NETLIFY_SITE_URL,
  NEXT_PUBLIC_PREVIEW_SECRET,
} from "../../../config";

// Web preview configuration
const remotePreviewUrl = `${NEXT_PUBLIC_NETLIFY_SITE_URL}/api/preview?secret=${NEXT_PUBLIC_PREVIEW_SECRET}&slug=`;
const localPreviewUrl = `${NEXT_PUBLIC_SITE_URL}/api/preview?secret=${NEXT_PUBLIC_PREVIEW_SECRET}&slug=`;
const previewURL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? localPreviewUrl
    : remotePreviewUrl;
const publishedURL = NEXT_PUBLIC_SITE_URL;

export const Wishlist = (S: StructureBuilder) => {
  return S.listItem()
    .title("Wishlist")
    .schemaType("wishlistPage")
    .icon(FaHeart)
    .child(
      S.document()
        .title("Wishlist")
        .schemaType("wishlistPage")
        .documentId("wishlistPage")
        .views([
          S.view.form().icon(EditIcon),
          // Including the iframe pane, with a function to create the url
          S.view
            .component(Iframe)
            .options({
              url: (doc: SanityDocument) => resolveProductionUrl(doc, true),
              reload: {
                button: true, // default `undefined`
                revision: true, // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
              },
            })
            .title("Web Preview")
            .icon(EarthGlobeIcon),
          S.view
            .component(SeoPreviews)
            .options({ previewURL, publishedURL })
            .icon(EyeOpenIcon)
            .title("SEO Preview"),
          // S.view
          //     .component(ColorblindPreview)
          //     .options({ previewURL })
          //     .icon(EyeOpenIcon)
          //     .title("Colorblind"),
          // S.view
          //     .component(TextToSpeechPreview)
          //     .options({ fields: ["title", "excerpt", "body"] })
          //     .icon(MdAccessibility)
          //     .title("Text to speech"),
          // S.view.component(BraillePreview).icon(MdAccessibility).title("Braille"),
        ])
    );
};
