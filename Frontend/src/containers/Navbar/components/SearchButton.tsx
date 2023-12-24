import SearchIcon from "@mui/icons-material/Search";
import { Button, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { FC } from "react";
import useMediaQuery from "src/hooks/useMediaQuery";

const Search = styled(Button)(({ theme }) => ({
  position: "relative",
  borderRadius: 40,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  boxShadow: "0.125rem 0.150rem 0.25rem rgba(0,0,0,.075)",
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

const handleButtonClick = () => {
  console.log("hello");
};

const SearchButton: FC = () => {
  const { isMobile } = useMediaQuery();
  return (
    <Search onClick={handleButtonClick}>
      {!isMobile && (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <SearchIcon sx={{ color: "white" }} />
          <Typography variant="body2">Search...</Typography>
        </Stack>
      )}
      {isMobile && <SearchIcon sx={{ color: "white" }} />}
    </Search>
  );
};

export default SearchButton;
