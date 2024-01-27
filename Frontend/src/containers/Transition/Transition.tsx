import { forwardRef } from "react";

// MUI
import { Fade, Box, Grow, SxProps } from "@mui/material";

export interface TransitionProps {
  children: React.ReactNode;
  type?: "grow" | "fade" | "collapse" | "slide" | "zoom";
  position?:
    | "top-left"
    | "top-right"
    | "top"
    | "bottom-left"
    | "bottom-right"
    | "bottom";
}

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  ({ children, type, ...others }, ref) => {
    const positionSx: SxProps = {
      transformOrigin: "0 0 0",
    };

    return (
      <Box ref={ref}>
        {type === "grow" && (
          <Grow {...others}>
            <Box sx={positionSx}>{children}</Box>
          </Grow>
        )}
        {type === "fade" && (
          <Fade
            {...others}
            timeout={{
              appear: 0,
              enter: 300,
              exit: 150,
            }}
          >
            <Box sx={positionSx}>{children}</Box>
          </Fade>
        )}
      </Box>
    );
  },
);

Transition.displayName = "Transition";

export default Transition;
