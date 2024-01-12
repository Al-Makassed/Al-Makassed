import SearchIcon from "@mui/icons-material/Search";
// import ArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import { InputBase, List, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { ChangeEvent, FC, useState } from "react";
import search from "src/animation/search.json";
import MaqasidDialog from "src/components/MaqasidDialog";
import ResultsListItemButton from "./components/ResultsListItemButton";
import useGetSearchResults from "./hooks/useGetSearchResults";
import { SearchDialogProps } from "./types";
import useMediaQuery from "src/hooks/useMediaQuery";

const SearchDialog: FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>("");

  const { isSearching, results } = useGetSearchResults(query);

  const { isMobile } = useMediaQuery();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <MaqasidDialog
      isOpen={isOpen}
      // isOpen={true}
      onClose={onClose}
      variant="center"
      fullWidthOnSmallScreen={isMobile}
    >
      <MaqasidDialog.Header>
        <Stack direction="row" alignItems="center" width="100%">
          <SearchIcon
            color="primary"
            sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
          />

          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontSize: { xs: "0.80rem", sm: "1.1rem" },
            }}
            placeholder="What are you looking for?"
            autoFocus
            fullWidth
            value={query}
            onChange={handleInputChange}
          />
        </Stack>

        <MaqasidDialog.Actions>
          <MaqasidDialog.Close size="small" />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <MaqasidDialog.Body niceScroll>
        {!isSearching && (
          <Stack alignItems="center" width="100%">
            <Lottie animationData={search} style={{ width: "250px" }} />
          </Stack>
        )}
        {isSearching ? (
          <Typography variant="body1">Searching...</Typography>
        ) : (
          <List>
            <Stack gap={2}>
              {results &&
                results.map((result) => (
                  <ResultsListItemButton
                    key={result.id}
                    result={result}
                    handleClose={onClose}
                  />
                ))}
            </Stack>
          </List>
        )}
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default SearchDialog;
