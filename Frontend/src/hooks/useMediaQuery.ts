import useMuiMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

const useMediaQuery = () => {
  const isMobile = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm"),
  );
  const isTablet = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md"),
  );
  const isDesktop = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("md"),
  );
  const isLargeDesktop = useMuiMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg"),
  );

  return { isMobile, isTablet, isDesktop, isLargeDesktop };
};

export default useMediaQuery;
