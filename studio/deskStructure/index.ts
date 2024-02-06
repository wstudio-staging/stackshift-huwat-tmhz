import { StructureBuilder, deskTool as sanityDesktool } from "sanity/desk";
import packageJson from "../../package.json";
import {
  NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP,
  NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
} from "studio/config";

import { Page } from "./pages";
import { Store } from "./store";

import { webriqStudioDeskVersion } from "@webriq-pagebuilder/sanity-plugin-desk-studio-version";

let showStore = true;

if (NEXT_PUBLIC_SANITY_STUDIO_FROM_STAGING_APP !== "true") {
  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true") {
    showStore = false;
  }
}

export default sanityDesktool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items(
        showStore
          ? [
              Page(S),
              S.divider(),
              Store(S),
              webriqStudioDeskVersion(S, packageJson),
            ]
          : [Page(S), webriqStudioDeskVersion(S, packageJson)]
      ),
  name: "desk",
  title: "Desk",
});
