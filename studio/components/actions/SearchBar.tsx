// reference: https://www.sanity.io/ui/docs/component/autocomplete
import { Autocomplete, Box, Card, Flex, Text } from "@sanity/ui";
import { MdManageSearch } from "react-icons/md";
import { SearchItemsTypes } from "types";

export default function SearchBar({ searchItems, onClickHandler }: SearchItemsTypes) {
  const options = searchItems?.map((item) => ({ value: item?._id, ...item }));

  return (
    <Autocomplete
      openButton
      fontSize={2}
      padding={3}
      //icon={MdManageSearch}
      id="variants-list-searchbar"
      options={options}
      placeholder="Select to replace current one"
      // custom search filter
      filterOption={(query, option) => 
        option?.label
          ?.toLowerCase()
          ?.indexOf(query.toLowerCase()) > -1
      }
      // custom value render function
      renderValue={(value, option) => 
        option?.label || value
      }
      // custom option render function
      renderOption={(option) => (
        <Card as="button" onClick={() => onClickHandler(option)} role="button">
          <Box padding={4}>
            <Text>{option?.label ?? "Untitled document"}</Text>
            <Text size={1} muted style={{ marginTop: "12px" }}>
              {option?.variant ?? "Variant not set"}
            </Text>
          </Box>  
        </Card>     
      )}
    />
  )
}