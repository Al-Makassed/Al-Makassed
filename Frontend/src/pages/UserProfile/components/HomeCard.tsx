import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import ProgressBar from "src/components/ProgressBar";
import useGetReadingsPercentage, {
  ReadingEntityType,
} from "../hooks/useGetReadingsPercentage";

const HomeCard: FC = () => {
  const { readingsPercentage: policyResult } = useGetReadingsPercentage(
    ReadingEntityType.POLICY,
  );

  const { readingsPercentage: dependencyResult } = useGetReadingsPercentage(
    ReadingEntityType.DEPENDENCY,
  );

  if (!policyResult || !dependencyResult) return <h2>loading...</h2>;

  const policyPercentage = policyResult.result;

  const dependencyPercentage = dependencyResult.result;

  return (
    <Stack gap={4} mb={2} maxWidth="927px">
      <Typography variant="h6" px={2} sx={{ letterSpacing: 1, wordSpacing: 4 }}>
        Your Progress
      </Typography>

      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack alignItems="center" gap={2}>
          <ProgressBar percentage={policyPercentage} type="Policies" />
          <Typography variant="body2" px={2} textAlign="center" maxWidth="85%">
            This is your progress in reading assigned policies files.
          </Typography>
        </Stack>
        <Stack alignItems="center" gap={2}>
          <ProgressBar percentage={dependencyPercentage} type="Dependencies" />
          <Typography variant="body2" px={2} textAlign="center" maxWidth="85%">
            This is your progress in reading assigned policies' dependencies
            files.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeCard;
