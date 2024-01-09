import SearchIcon from "@mui/icons-material/Search";
// import ArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import { InputBase, List, Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import useGetSearchResults from "./hooks/useGetSearchResults";
import { SearchDialogProps } from "./types";

import ResultsListItemButton from "./components/ResultsListItemButton";

const SearchDialog: FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>("");

  const { isSearching, results } = useGetSearchResults(query);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <MaqasidDialog
      isOpen={isOpen}
      // isOpen={true}
      onClose={onClose}
      variant="center"
    >
      <MaqasidDialog.Header>
        <Stack direction="row" alignItems="center" width="100%">
          <SearchIcon color="primary" sx={{ fontSize: "1.8rem" }} />

          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "1.1rem" }}
            placeholder="What are looking for?"
            autoFocus
            fullWidth
            value={query}
            onChange={handleInputChange}
          />
        </Stack>

        <MaqasidDialog.Actions>
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <MaqasidDialog.Body niceScroll>
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
