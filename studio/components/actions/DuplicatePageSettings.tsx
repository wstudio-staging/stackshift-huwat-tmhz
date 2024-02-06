import React from "react";
import {
  Badge,
  Box, 
  Card, 
  Flex,
  Inline, 
  Stack, 
  Switch, 
  Text, 
  TextInput,
} from "@sanity/ui";
import { ComposeIcon, ArrowLeftIcon, RestoreIcon, CloseCircleIcon } from "@sanity/icons"
import { ButtonWithTooltip, SearchBar } from ".";


export default function DuplicatePageSettings({ page, variants, setValues, setDialogOpen }) {
  let variantStr = "", sectionVariant = "Variant not selected";

  const [duplicateSections, setDuplicateSections] = React.useState(page?.sections);
  const [pageTitle, setPageTitle] = React.useState("");

  // FEATURE BUTTONS: NEW | EXCLUDE | REVERT REFERENCES
  const handleFeatureButtons = (type: "new" | "exclude" | "revert", position: number) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        if(type === "new") {  
          if(section?.current) {             
            // create new copy of section
            return {
              ...section,
              label: `Copy of ${section?.label}`,
              current: !section.current,
            }
          } else {
            // use current section
            return {
              ...section,
              label: section?.label?.replace("Copy of ", ""),
              current: true,
              include: true,
              isEditing: false,
            }
          }
        } else if(type === "exclude") {
          return {
            ...section,
            label: !section?.customLabel ? section?.label?.replace("Copy of ", "") : section?.customLabel,
            include: !section?.include,
            current: true,
            isEditing: false,
          }
        } else if(type === "revert") {
          return {
            ...page?.sections[position],
            current: true,
            include: true,
            replaced: false,
            isEditing: false,
          };
        } else {
          console.log("[ERROR] Supported types: 'new' | 'exclude' | 'revert' only")
        }
      }
    });

    setDuplicateSections(updated);
    setValues((prev) => ({...prev, sections: updated, dialogFn: setDialogOpen}));
  }

  // EDIT REFERENCE
  const handleEditReferenceBtn = (value: any, position) => {
    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        if(value) {
          // return new shape
          const { replaced, isEditing, ...rest } = value;

          return duplicateSections[index] = { 
            replaced: true, 
            isEditing: false, 
            ...rest 
          };
        }

        return {
          ...section,
          isEditing: !section?.isEditing,
        };
      }
    });

    setDuplicateSections(updated);
    setValues((prev) => ({...prev, sections: updated, dialogFn: setDialogOpen}));
  }

  // UPDATE SECTION LABEL FOR NEW COPY
  const handleUpdateSectionLabel = (event, position: number) => {
    const value = event?.target?.value;
    const hasValue = value?.trim()?.length !== 0;

    const updated = duplicateSections?.map((section, index) => {
      if(index !== position) {
        return section; // no change
      } else {
        // return new shape
        return { 
          ...section,
          customLabel: hasValue ? value : ""
        };
      }
    });

    setDuplicateSections(updated);
    setValues((prev) => ({...prev, sections: updated, dialogFn: setDialogOpen}));
  }

  return (
    <Card padding={2}>
      <Stack space={2}>
        <Text size={1} weight="bold">
          Title
        </Text>
        <Text size={1} style={{ marginTop: "3px", marginBottom: "5px" }} muted>
          A new unique title will help you remember what this page is for later.
        </Text>
        <div className="relative">
          <TextInput
            fontSize={2}
            value={pageTitle}
            padding={[3, 3, 4]}
            placeholder={`Copy of ${page?.title || page?.name}`}
            onChange={(event) => {
              setPageTitle(event.target.value)
              setValues((prev) => ({...prev, title: event.target.value}))
            }}
            radius={2}
          />
          {pageTitle?.trim()?.length !== 0 && (pageTitle?.toUpperCase() !== page?.title?.toUpperCase()) && (
            <ButtonWithTooltip toolTipText="Revert">
              <button
                aria-label="Revert title changes"
                className="absolute top-0 right-0 z-20 mt-3 mr-3"
                onClick={() => setPageTitle("")}
              >
                <RestoreIcon style={{ fontSize: 24 }} />
              </button>
            </ButtonWithTooltip>
          )}
        </div>
      </Stack>
      <Box paddingY={4}>
        <Stack space={2}>
          <Text size={1} weight="bold">
            Sections
          </Text>
          {duplicateSections?.map((section, index) => {
            if (section?.variant) {
              variantStr =
                section?.variant?.charAt(0).toUpperCase() +
                section?.variant?.substr(1, section?.variant.length - 2) +
                section?.variant?.charAt(section?.variant.length - 1).toUpperCase() // the first and last letters of variant to uppercase
    
              sectionVariant = variantStr?.replace(/_/g, " ") // replace underscore (_) with whitespace
            }

            return (
              <React.Fragment key={section?._id}>
                <Card 
                  padding={3} 
                  radius={2} 
                  shadow={1}
                  style={{
                    backgroundColor: !section?.include && "#e5e7ebb5"
                  }}
                >
                  {section?.isEditing ? (
                    <div className="flex flex-wrap justify-between">
                      {/* Cancel button + search bar + type buttons (restore and/or exclude) */}
                      <div className="flex flex-wrap w-3/4">
                        <ButtonWithTooltip toolTipText="Cancel">
                          <button
                            aria-label="Go back to previous window"
                            className="items-center text-center font-medium text-webriq-darkblue hover:text-webriq-babyblue"
                            onClick={() => handleEditReferenceBtn(null, index)}
                          >
                            <ArrowLeftIcon style={{ fontSize: 30 }} />
                          </button>
                        </ButtonWithTooltip>
                        {/* Search bar to select variant */}
                        <Box padding={2} style={{ width: "90%" }}>
                          <SearchBar 
                            searchItems={variants?.filter((variant) => 
                              variant?._type === section?._type && variant?.label !== section?.variants?.label
                            )} 
                            onClickHandler={(value) => handleEditReferenceBtn(value, index)}
                          />
                        </Box>
                      </div>
                      <div className="flex flex-wrap">
                        {/* Revert changes button */}
                        {(section?.replaced || !section?.include) && (
                          <ButtonWithTooltip toolTipText="Revert">
                            <button
                              aria-label="Revert changes"
                              className="mr-3"
                              onClick={() => handleFeatureButtons("revert", index)}
                            >
                              <RestoreIcon style={{ fontSize: 30 }} />
                            </button>
                          </ButtonWithTooltip>
                        )}
                        {/* Exclude reference button */}
                        <ButtonWithTooltip toolTipText="Exclude">
                          <button
                            aria-label="Exclude reference"
                            onClick={() => handleFeatureButtons("exclude", index)}
                          >
                            <CloseCircleIcon style={{ fontSize: 30, color: "maroon" }} />
                          </button>
                        </ButtonWithTooltip>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Flex justify="space-between">
                        <Inline className="showBtn" space={2} padding={2}>
                          {!section?.current ? (
                            <Inline space={2} style={{ paddingBottom: 3, minHeight: "24px" }}>
                              <TextInput
                                fontSize={2} 
                                padding={2}
                                value={!section?.current && section?.customLabel ? section?.customLabel : ""}
                                placeholder={section?.label}
                                onChange={(event) => handleUpdateSectionLabel(event, index)}
                                radius={2}
                                size={30}
                                autoFocus
                              />
                              {!section?.include && (
                                <Badge mode="outline" tone="critical">Not included</Badge> 
                              )}
                              {!section?.current && (
                                <Badge mode="outline" tone="primary">New</Badge>
                              )}
                            </Inline>
                          ) : (
                            <Inline space={2}>
                              <Text style={{ paddingTop: 8, minHeight: "24px" }}>
                                {section?.label ?? "Untitled document"}
                              </Text>
                              {!section?.include && (
                                <Badge mode="outline" tone="critical">Not included</Badge> 
                              )}
                            </Inline>
                          )}
                          {/* Replace reference button */}
                          {section?.include && (
                            <ButtonWithTooltip toolTipText="Edit">
                              <button
                                aria-label="Replace reference"
                                className={`text-webriq-darkblue hover:text-webriq-babyblue ${!section?.isEditing && "hide"}`}
                                onClick={() => handleEditReferenceBtn(null, index)}
                              >
                                <ComposeIcon style={{ fontSize: 24 }} />
                              </button>
                            </ButtonWithTooltip>
                          )}
                          {/* Revert changes button */}
                          {!section?.isEditing && !section?.include && (
                            <ButtonWithTooltip toolTipText="Revert">
                              <button
                                aria-label="Revert changes"
                                className="mr-3"
                                onClick={() => handleFeatureButtons("revert", index)}
                              >
                                <RestoreIcon style={{ fontSize: 30 }} />
                              </button>
                            </ButtonWithTooltip>
                          )}
                        </Inline>
                        {/* Reference toggle button */}
                        <Box padding={3}>
                          <ButtonWithTooltip toolTipText={!section?.current ? "Use Current" : "New Copy"}>
                            <Switch 
                              id={`${section?._type}-${index + 1}`}
                              aria-label={`${!section?.current ? "Use Current" : "New Copy"} for ${section?.label}`}
                              name={`${!section?.current ? "Use Current" : "New Copy"} for ${section?.label}`}
                              value={section?._type}
                              disabled={!section?.include}
                              checked={!section?.current}
                              onChange={() => handleFeatureButtons("new", index)}
                            />
                          </ButtonWithTooltip>
                        </Box>
                      </Flex>
                      <Box paddingX={2} paddingBottom={2}>
                        <Text size={1} muted>
                          {`${sectionVariant} • ${section?._type?.toUpperCase()}`}
                        </Text>
                      </Box>
                      {section?.replaced && (
                        <Box padding={2}>
                          <Text size={1} style={{ fontStyle: "italic", color: "blue" }} muted>
                            This section has been updated
                          </Text>
                        </Box>
                      )}
                    </>
                  )}
                </Card>
              </React.Fragment>
            )
          })}
        </Stack>
      </Box>
    </Card>
  )
}