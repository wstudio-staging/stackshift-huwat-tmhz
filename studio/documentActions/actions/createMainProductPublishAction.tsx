import { useState, useEffect } from "react";
import { useToast } from "@sanity/ui";
import { useClient, useDocumentOperation, useValidationStatus } from "sanity";
import {
  NEXT_PUBLIC_SITE_URL,
  SITE_STORE_CORS_SECRET,
  NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
} from "../../config";
import { useSecrets } from "@sanity/studio-secrets";
import { namespace, getAuthHeaders } from "../sanity-secrets/config";
import { PortableTextToHTML } from "studio/utils/PortableTextToHtml";

export default function createMainProductPublishAction(props) {
  const { id, type, draft, published, onComplete } = props;

  const client = useClient({ apiVersion: "v2021-10-21" });
  const toast = useToast();
  const { validation } = useValidationStatus(id, type);
  const { patch, publish } = useDocumentOperation(id, type);

  const [isPublishing, setIsPublishing] = useState(false);

  // store the secret token into sanity-secrets
  let { secrets } = useSecrets(namespace);
  secrets = SITE_STORE_CORS_SECRET;

  // return the siteURL to use on development or production
  let siteUrl = "http://localhost:3000";
  if (
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost")
  ) {
    siteUrl = NEXT_PUBLIC_SITE_URL;
  }

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props]);

  const isDisabled =
    validation.length !== 0 ||
    isPublishing ||
    NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true";

  return {
    disabled: isDisabled || !draft,
    label: isPublishing ? <span>Publishing...</span> : <span>Publish</span>,
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true);

      // for documents of type 'mainProduct', call addOrUpdate API endpoint on publish
      const id = draft?._id || props?.id;

      // make sure we have our secrets and id values
      if (secrets && id) {
        try {
          // fetch for the required document data by doing a query using the document ID
          const getData = await client
            .fetch("*[_id==$documentId]", { documentId: id })
            .then((result) => result);

          // update block type description to HTML
          const updatedData = getData?.map((item) => ({
            ...item,
            description: PortableTextToHTML(item?.description),
          }));

          // with data available, do the API request and pass the required data as payload
          if (getData) {
            await fetch(`${siteUrl}/api/ecwid/products`, {
              method: !published ? "POST" : "PUT", // check if out page has been published or is a draft
              headers: {
                ...getAuthHeaders(secrets),
                "content-type": "application/json",
              }, // pass sanity secrets to header
              body: JSON.stringify(...updatedData),
            }).then(async (response) => {
              if (!response.ok) {
                // show toast notification on failed request
                console.log(response);
                throw new Error("Failed to do POST/PUT request");
              } else {
                const product = await response.json();
                console.log("[INFO] product", product);

                // If product is newly created, we patch the current id of it in the document schema
                if (!published) {
                  patch.execute([
                    { set: { ecwidProductId: product?.data?.id } },
                  ]);
                }

                // Perform the publish
                publish.execute();

                // Signal that the action is completed
                onComplete();

                // show toast notification on successful request
                toast.push({
                  status: "success",
                  title: `Successfully ${
                    !published ? "added" : "updated"
                  } product on Ecwid store!`,
                });
              }
            });
          }
        } catch (error) {
          console.log("Error: ", error);

          // show toast notification on failed request
          toast.push({
            status: "error",
            title:
              "Ooops, unable to complete request! See logs for more info...",
          });

          // Signal that the action is completed
          onComplete();
        }
      }
    },
  };
}
