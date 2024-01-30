import Autocomplete, {
  AutocompleteRenderGetTagProps,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { ReactNode } from "react";
import { ShowMoreButton } from "./styled";
import { MultiSelectAutoCompleteProps } from "./types";

const MultiSelectAutoComplete = <T extends ReactNode>(
  initialProps: MultiSelectAutoCompleteProps<T>,
) => {
  const {
    showChips = true,
    showChipFullText = true,
    showCheckbox = false,
    ...props
  } = initialProps;

  const renderTags = (
    values: Array<T>,
    getTagProps: AutocompleteRenderGetTagProps,
  ) => {
    // eslint-disable-next-line react/prop-types
    const limitTags = props.limitTags ?? -1;
    const shouldLimitTags = limitTags && values.length > limitTags;
    const visibleChips = shouldLimitTags ? values.slice(0, limitTags) : values;
    const hiddenChips = shouldLimitTags ? values.slice(limitTags) : [];
    return (
      <>
        {visibleChips.map((v, index) => (
          <Chip
            variant="filled"
            color="info"
            sx={{
              ...(!showChipFullText && {
                maxWidth: "150px",
              }),
            }}
            label={v}
            {...getTagProps({ index })}
            key={index}
          />
        ))}
        {shouldLimitTags && (
          <Tooltip
            disableInteractive
            title={
              <>
                {hiddenChips.map((chip, idx) => (
                  <Box key={idx}>{chip}</Box>
                ))}
              </>
            }
          >
            <ShowMoreButton data-testid="showMoreButton">
              +{hiddenChips.length}
            </ShowMoreButton>
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <Autocomplete<T, true, boolean, boolean>
      multiple
      fullWidth
      renderTags={showChips ? renderTags : undefined}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {showCheckbox && (
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
          )}
          {option}
        </li>
      )}
      {...props}
    />
  );
};

export default MultiSelectAutoComplete;
