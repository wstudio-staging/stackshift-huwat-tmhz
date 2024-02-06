import React, { useState, useEffect } from "react";
import { useToast, Tooltip, Box, Text } from "@sanity/ui";
import { useDocumentOperation, useValidationStatus } from "sanity";
import { processData } from "../../stripeActions/process-data";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";

export default function createProductsPublishAction(props) {
  const toast = useToast();

  const { validation } = useValidationStatus(props.id, props.type);
  const { publish } = useDocumentOperation(props.id, props.type);

  const [isPublishing, setIsPublishing] = useState(false);

  const CStudioSchemas = [
    "mainProduct",
    "mainCollection",
    "productSettings",
    "collectionSettings",
    "cartPage",
    "wishlistPage",
    "searchPage",
  ];

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  useEffect(() => {
    const payload = !props.draft
      ? {
          data: props.published?.variants,
          variant: props.published?.variant,
          type: props.published?._type,
        }
      : {
          data: props.draft?.variants,
          variant: props.draft?.variant,
          type: props.draft?._type,
        };

    async function create() {
      const response = await processData(payload);

      if (response) {
        toast.push({
          status: response.status === 500 ? "error" : "success",
          title: response.statusText,
        });
      }
    }

    publish.disabled !== "ALREADY_PUBLISHED" &&
      publish.disabled !== "NO_CHANGES" &&
      create();
  }, [isPublishing]);

  const isCStudioDisabled =
    NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO !== "true" &&
    CStudioSchemas?.includes(props.type);
  const isDisabled = validation.length !== 0 || isPublishing;

  return {
    disabled: isDisabled || !props?.draft || isCStudioDisabled,
    label: [
      "page",
      "post",
      "category",
      "author",
      "mainProduct",
      "mainCollection",
      "productSettings",
      "collectionSettings",
      "cartPage",
      "wishlistPage",
      "searchPage",
    ].includes(props.type) ? (
      <CustomPublishLabel hasErrors={isDisabled} isPublishing={isPublishing} />
    ) : isPublishing ? (
      "Saving..."
    ) : (
      "Save"
    ),
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true);

      // Perform the publish
      publish.execute();

      // Signal that the action is completed
      props.onComplete();
    },
  };
}

function CustomPublishLabel({ hasErrors = false, isPublishing = false }) {
  if (hasErrors) {
    return (
      <Tooltip
        content={
          <Box padding={2}>
            <Text size={2}>
              There are validation errors that need to be fixed
              <br /> before this document can be published!
            </Text>
          </Box>
        }
        placement="top"
        portal
      >
        <span>Publish</span>
      </Tooltip>
    );
  }

  return isPublishing ? <span>Publishing...</span> : <span>Publish</span>;
}
