import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Skeleton } from "@mui/material";
import { MaqasidDialogProps } from "src/components/MaqasidDialog/types";

interface LoadingSkeletonProps extends MaqasidDialogProps {}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ isOpen, ...rest }) => {
  return (
    <MaqasidDialog
      isOpen={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      variant="right"
      {...rest}
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Loading chapter details.." />
      </MaqasidDialog.Header>
      <MaqasidDialog.Body niceScroll>
        <Skeleton variant="text" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={150} />
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default LoadingSkeleton;
