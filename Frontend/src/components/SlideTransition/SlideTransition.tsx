import React, { forwardRef, Ref, ReactElement } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

interface SlideTransitionProps extends TransitionProps {
  children: ReactElement;
}

const SlideTransition = forwardRef<Ref<HTMLElement>, SlideTransitionProps>(
  (props, ref) => {
    return <Slide direction="left" ref={ref} {...props} />;
  },
);

SlideTransition.displayName = "SlideTransition";

export default SlideTransition;
