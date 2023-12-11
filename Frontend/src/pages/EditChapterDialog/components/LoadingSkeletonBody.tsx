import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { Skeleton } from "@mui/material";

const LoadingSkeletonBody: FC = () => {
  return (
    <MaqasidDialog.Body niceScroll>
      <Skeleton variant="text" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={150} />
    </MaqasidDialog.Body>
  );
};

export default LoadingSkeletonBody;
