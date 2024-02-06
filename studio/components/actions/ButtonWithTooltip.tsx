import {
  Box, 
  Text, 
  Tooltip
} from "@sanity/ui";
import { ButtonWithTooltipTypes } from "types";

export default function ButtonWithTooltip({ toolTipText, children }: ButtonWithTooltipTypes) {
  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text size={2}>{toolTipText}</Text>
        </Box>
      }
      fallbackPlacements={["top", "right"]}
      placement="bottom"
      portal
    >
      {children}
    </Tooltip>
  )
}