import useMuiMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

const useMediaQuery = () => {
  const isMobile = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm"),
  );
  const isTabletOrLess = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md"),
  );
  const isDesktopOrMore = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("md"),
  );
  const isLargeDesktop = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg"),
  );

  return { isMobile, isTabletOrLess, isDesktopOrMore, isLargeDesktop };
};

export default useMediaQuery;
