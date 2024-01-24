import { List, Stack, Theme, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { FinishedDependency, FinishedPolicy } from "../../API/types";
import useGetFinishedDependencies from "../../hooks/useGetFinishedDependencies";
import useGetFinishedPolicies from "../../hooks/useGetFinishedPolicies";
import { StyledSubTitle } from "../../styled";
import {
  getFinishedListInMonthExceptWeek,
  getFinishedListInWeek,
} from "../../utils";
import DependencyChunk from "./DependencyChunk";
import PolicyChunk from "./PolicyChunk";
import ActivityCardLoadingSkeleton from "./ActivityCardLoadingSkeleton";

const ActivityCard: FC = () => {
  const { policies, isFetching: policiesIsFetching } =
    useGetFinishedPolicies("");

  const { dependencies, isFetching: dependenciesIsFetching } =
    useGetFinishedDependencies("");

  const theme = useTheme<Theme>();

  if (policiesIsFetching || dependenciesIsFetching)
    return <ActivityCardLoadingSkeleton />;

  if (!policies || !dependencies) return null;

  const allFinishedFiles = [...policies, ...dependencies];

  const thisWeekFiles = getFinishedListInWeek(allFinishedFiles);

  const thisMonthFiles = getFinishedListInMonthExceptWeek(allFinishedFiles);

  return (
    <List
      sx={{
        height: "calc(100vh - 64px - 40px - 211px - 16px - 48px)",
        overflowY: "auto",
        ...theme.mixins.niceScroll(),
      }}
    >
      <Stack gap={2}>
        <StyledSubTitle variant="h6">This Week</StyledSubTitle>

        <Stack gap={1.75}>
          {thisWeekFiles.map((file) =>
            file.type === "policy" ? (
              <PolicyChunk
                key={(file as FinishedPolicy).policyId}
                policy={file as FinishedPolicy}
              />
            ) : (
              <DependencyChunk
                key={(file as FinishedDependency).dependencyId}
                finishedFile={file as FinishedDependency}
              />
            ),
          )}
        </Stack>

        {thisMonthFiles.length > 0 && (
          <>
            <Typography variant="h6" ml={1.5}>
              This Month
            </Typography>
            <Stack gap={1.5}>
              {thisMonthFiles.map((file) =>
                file.type === "policy" ? (
                  <PolicyChunk
                    key={(file as FinishedPolicy).policyId}
                    policy={file as FinishedPolicy}
                  />
                ) : (
                  <Typography key={file.type} ml={1.5}>
                    {file.name}
                  </Typography>
                ),
              )}
            </Stack>
          </>
        )}
      </Stack>
    </List>
  );
};

export default ActivityCard;
