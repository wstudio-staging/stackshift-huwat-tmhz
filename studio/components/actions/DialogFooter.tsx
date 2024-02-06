import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Inline,
  useToast,
  Popover,
  Stack,
  Text,
} from "@sanity/ui";
import { nanoid } from "nanoid";
import { useClient } from "sanity";

export default function DialogFooter({
  page,
  title,
  sections,
  dialogFn,
  values,
  setValues,
}) {
  const toast = useToast();
  const sanityClient = useClient({ apiVersion: "2021-10-21" }); // latest API version in Vision

  const [isLoading, setIsLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const document = values?.page || page;
  const pageTitle = values?.title || `Copy of ${title}`;
  const pageSections = values?.sections || sections;
  const setDialogOpen = values?.dialogFn || dialogFn;
  const isReadyForDuplicate =
    pageSections?.filter((section) => section?.include)?.length !== 0;

  // DUPLICATE DOCUMENT
  const handleDuplicateBtn = async (payload: any) => {
    setIsLoading(true);

    try {
      const updatedSections = await Promise.all(
        payload?.sections?.map(async (section) => {
          if (section?.current) {
            // use the existing section object for the new document
            return {
              _key: nanoid(),
              _ref: section?._id,
              _type: section?._type,
            };
          } else {
            // create new document for the section and use result "_id" as reference
            return await sanityClient
              .create({
                label: section?.label,
                variant: section?.variant,
                variants: section?.variants,
                _type: section?._type,
              })
              .then((result) => ({
                _key: nanoid(),
                _ref: result?._id,
                _type: result?._type,
              }));
          }
        })
      );

      payload.sections = updatedSections;
      console.log("[INFO] Duplicate sections created! ");

      // make sure we have new section documents before creating the duplicate document
      if (sections.length !== 0) {
        await sanityClient
          .create(payload, {
            tag: "sanity.studio.document.duplicate",
            returnFirst: true,
            returnDocuments: true,
            visibility: "sync",
          })
          .then((response) => {
            console.log("[INFO] Successfully duplicated document: ", response);
            toast.push({
              status: "success",
              title: "Successfully duplicated document!",
            });
            setIsLoading(false);
            setDialogOpen(false);
          });
      }
    } catch (error) {
      setIsLoading(false);

      console.log(
        "Sorry, something went wrong. Failed to duplicate document.",
        error
      );

      toast.push({
        status: "error",
        title: "Sorry, something went wrong. Failed to duplicate document.",
      });
    }
  };

  // CONFIRM CLOSE DIALOG
  const handleConfirmCloseDialog = () => {
    if (!values?.sections && !values?.title) {
      setDialogOpen(false);
    } else {
      setOpenConfirmDialog(true);
    }
  };

  return (
    <Flex justify="space-between">
      <p className="ml-4 text-sm text-gray-500">
        <span className="font-bold">
          {pageSections?.filter((section) => section?.include)?.length}
        </span>{" "}
        section/s to duplicate
      </p>
      <Box style={{ textAlign: "right" }}>
        <Inline space={2}>
          {/* Close dialog */}
          <Popover
            content={
              <Stack space={4}>
                <Text>Are you sure you want to discard all changes?</Text>
                <Inline space={2}>
                  <Button
                    fontSize={2}
                    padding={3}
                    text="Continue editing"
                    mode="ghost"
                    onClick={() => setOpenConfirmDialog(false)}
                  />
                  <Button
                    fontSize={2}
                    padding={3}
                    text="Confirm cancel"
                    onClick={() => {
                      // make sure we reset all stored values as well
                      setValues({
                        page: null,
                        title: undefined,
                        sections: undefined,
                      });
                      setDialogOpen(false);
                    }}
                    style={{
                      backgroundColor: "#0045d8",
                      boxShadow: "unset",
                      marginRight: "10px",
                    }}
                  />
                </Inline>
              </Stack>
            }
            padding={4}
            placement="top"
            portal
            open={
              openConfirmDialog &&
              (values?.sections !== undefined || values?.title !== undefined)
            }
          >
            <Button
              fontSize={2}
              padding={3}
              text="Cancel"
              mode="ghost"
              disabled={openConfirmDialog}
              onClick={handleConfirmCloseDialog}
            />
          </Popover>

          {/* Duplicate button */}
          <Button
            fontSize={2}
            padding={3}
            text="Duplicate"
            onClick={() =>
              handleDuplicateBtn({
                _id: "drafts.", // to auto-generate a draft document ID
                title: pageTitle,
                slug: {
                  current: pageTitle
                    ?.replace(/[^a-z0-9 ]/gi, "")
                    ?.replace(/\s+/g, "-")
                    ?.toLowerCase(),
                  _type: "slug",
                },
                _type: document?._type,
                sections: pageSections
                  ?.filter((section) => section?.include)
                  ?.map((section) => ({
                    ...section,
                    label: !section?.customLabel
                      ? section?.label
                      : section?.customLabel,
                    _type:
                      section?._type === "pages_productInfo"
                        ? "productInfo"
                        : section?._type,
                  })),
                seo: document?.seo,
              })
            }
            loading={isLoading}
            disabled={
              (openConfirmDialog && values?.sections !== undefined) ||
              !isReadyForDuplicate
            }
            style={{
              backgroundColor:
                !openConfirmDialog && isReadyForDuplicate
                  ? "#0045d8"
                  : "#d5e3ff",
              boxShadow: "unset",
              marginRight: "10px",
            }}
          />
        </Inline>
      </Box>
    </Flex>
  );
}
