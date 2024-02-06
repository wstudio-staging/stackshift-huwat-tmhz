import { defineConfig } from "sanity";
import {
  NEXT_PUBLIC_SANITY_PROJECT_NAME,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_PROJECT_OPENAI_KEY,
} from "studio/config";

// desk customization
import deskStructure from "studio/deskStructure";
import { Logo } from "studio/brand/logo";
import { DefaultStudioTheme } from "studio/brand/theme";

// document badge and action
import { LiveURLBadge } from "studio/badges/LiveURLBadge";
import { ResolveDocumentActions } from "studio/documentActions";

// schemas
import { schemaTypes } from "schemas/schema";

// plugins
import { media } from "sanity-plugin-media";
import { codeInput } from "@sanity/code-input";

import { visionTool } from "@sanity/vision";
import { webriqBlog } from "@webriq-pagebuilder/sanity-plugin-webriq-blog";
import { webriqForms } from "@webriq-pagebuilder/sanity-plugin-webriq-forms";
import { webriqPayments } from "@webriq-pagebuilder/sanity-plugin-webriq-payments";
import { webriqGPT3 } from "@webriq-pagebuilder/sanity-plugin-input-component-gpt3";
import { webriqComponents } from "@webriq-pagebuilder/sanity-plugin-webriq-components";
import { webriQInspectorInlineEdit } from "@webriq-pagebuilder/sanity-plugin-inspector-inline-edit";

export default defineConfig({
  basePath: "/studio",
  title: NEXT_PUBLIC_SANITY_PROJECT_NAME,
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  plugins: [
    deskStructure,
    visionTool(),
    webriqComponents(),
    webriqForms(),
    webriqPayments(),
    webriqBlog(),
    webriqGPT3(),
    webriQInspectorInlineEdit(),
    media(),
    codeInput(), // for "code" schema type
  ],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (process.env.NODE_ENV !== "production") {
      return prev;
    }
    return prev.filter((tool) => tool.name !== "vision");
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
  theme: DefaultStudioTheme,
  form: {
    image: {
      assetSources: (prev) => {
        // only display media browser and openai image assets as default options
        return prev.filter((asset) => asset.name !== "sanity-default");
      },
    },
  },
  schema: {
    types: schemaTypes,
  },
  document: {
    badges: [LiveURLBadge],
    actions: (prev, context) => ResolveDocumentActions({ prev, context }),
  },
});
