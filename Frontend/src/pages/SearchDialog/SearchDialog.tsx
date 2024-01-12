import SearchIcon from "@mui/icons-material/Search";
// import ArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import { InputBase, List, Stack, Typography } from "@mui/material";
import LoaderCell from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import { ChangeEvent, FC, useState } from "react";
import noMatches from "src/animation/noMatches.json";
import MaqasidDialog from "src/components/MaqasidDialog";
import useMediaQuery from "src/hooks/useMediaQuery";
import ResultsListItemButton from "./components/ResultsListItemButton";
import SearchLottie from "./components/SearchLottie";
import SearchingSkeleton from "./components/SearchingSkeleton";
import useGetSearchResults from "./hooks/useGetSearchResults";
import { SearchDialogProps } from "./types";

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
      onClose={onClose}
      variant="center"
      fullWidthOnSmallScreen={isMobile}
    >
      <MaqasidDialog.Header>
        <Stack direction="row" alignItems="center" width="100%">
          {!isSearching && (
            <SearchIcon
              color="primary"
              sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
            />
          )}

          {isSearching && <LoaderCell color="primary" size={20} />}

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
        {isSearching && <SearchingSkeleton />}

        {!isSearching && (
          <List disablePadding>
            {results && (
              <Stack gap={2}>
                {results.map((result) => (
                  <ResultsListItemButton
                    key={result.id}
                    result={result}
                    handleClose={onClose}
                  />
                ))}
              </Stack>
            )}

            {results?.length === 0 && (
              <Stack alignItems="center" width="100%">
                {query.trim() === "" ? (
                  <SearchLottie />
                ) : (
                  <>
                    <Lottie
                      animationData={noMatches}
                      style={{ width: "150px", marginTop: "-3em" }}
                    />

                    <Typography variant="body1" textAlign={"center"}>
                      No matches found for "<strong>{query}</strong>"
                    </Typography>
                  </>
                )}
              </Stack>
            )}
          </List>
        )}
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default SearchDialog;
