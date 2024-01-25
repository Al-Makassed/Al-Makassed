import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { FC, useState } from "react";
import useMediaQuery from "src/hooks/useMediaQuery";
import SearchDialog from "src/pages/SearchDialog/SearchDialog";

const Search = styled(Button)(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  boxShadow:
    "rgba(0,0,0,0.165) 0px 1px 1px inset, rgba(0,0,0,0.165) 0px 1px 0.5px",
  color: "white",
  cursor: "pointer",
  padding: "0.35rem 1.2rem",
  width: "auto",
  height: "fit-content",
  textTransform: "none",
  [theme.breakpoints.down("sm")]: {
    minWidth: 3,
    padding: "0.4rem 0.3rem 0.3rem 0.4rem",
  },
}));

const SearchButton: FC = () => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const { isMobile } = useMediaQuery();

  const handleButtonClick = () => {
    setIsSearchDialogOpen((prev) => !prev);
  };

  // isSearchDialogOpen && <SearchDialog onClose={() => {}} isOpen={true} />;
  return (
    <>
      <Search onClick={handleButtonClick}>
        {!isMobile && (
          <Stack direction="row" alignItems="center" gap={0.5}>
            <SearchIcon sx={{ color: "white" }} />
            <Typography variant="body2">Search...</Typography>
          </Stack>
        )}
        {isMobile && <SearchIcon sx={{ color: "white" }} />}
      </Search>

      {isSearchDialogOpen && (
        <SearchDialog
          onClose={() => setIsSearchDialogOpen(false)}
          isOpen={isSearchDialogOpen}
        />
      )}
    </>
  );
};

export default SearchButton;
