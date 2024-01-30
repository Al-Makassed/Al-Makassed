import { Card, Skeleton } from "@mui/material";
import { FC } from "react";
import ProgressBar from "src/components/ProgressBar";
import useGetReadingsPercentage from "../hooks/useGetReadingsPercentage";
import { ReadingEntityType } from "../constants";

const ProgressCard: FC = () => {
  const {
    readingsPercentage: policyResult,
    isFetching: isFetchingPolicyResult,
  } = useGetReadingsPercentage(ReadingEntityType.POLICY);

  const {
    readingsPercentage: dependencyResult,
    isFetching: isFetchingDependencyResult,
  } = useGetReadingsPercentage(ReadingEntityType.DEPENDENCY);

  if (isFetchingPolicyResult || isFetchingDependencyResult)
    return <Skeleton variant="rounded" height={149} />;

  if (!policyResult || !dependencyResult) return null;
  const policyPercentage = policyResult.result;

  const dependencyPercentage = dependencyResult.result;
  return (
    <Card
      sx={{
        display: "flex",
        direction: "row",
        justifyContent: "space-around",
        p: 1.5,
        height: "fit-content",
        borderRadius: 2.5,
      }}
    >
      <ProgressBar
        percentage={policyPercentage}
        type="Policies"
        size={125}
        thickness={3.5}
        labelWidth={70}
      />
      <ProgressBar
        size={120}
        thickness={3.5}
        labelWidth={90}
        percentage={dependencyPercentage}
        type="Dependencies"
      />
    </Card>
  );
};

export default ProgressCard;
