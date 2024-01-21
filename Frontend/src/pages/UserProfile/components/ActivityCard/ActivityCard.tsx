import { List, Stack, Theme, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import useGetFinishedPolicies from "../../hooks/useGetFinishedPolicies";
import { StyledSubTitle } from "../../styled";
import {
  getFinishedListInMonthExceptWeek,
  getFinishedListInWeek,
} from "../../utils";
import PolicyProgressChunk from "./PolicyProgressChunk";

const ActivityCard: FC = () => {
  const { policies, isFetching } = useGetFinishedPolicies("");

  const theme = useTheme<Theme>();

  if (isFetching) return <h2>Loading...</h2>;

  if (!policies) return null;

  const thisWeekPolicies = getFinishedListInWeek(policies);

  const thisMonthPolicies = getFinishedListInMonthExceptWeek(policies);

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
        <Stack gap={1.5}>
          {thisWeekPolicies.map((policy) => (
            <PolicyProgressChunk key={policy.policyId} policy={policy} />
          ))}
        </Stack>

        {thisMonthPolicies.length > 0 && (
          <>
            <Typography variant="h6" ml={1.5}>
              This Month
            </Typography>
            <Stack gap={1.5}>
              {thisMonthPolicies.map((policy) => (
                <PolicyProgressChunk key={policy.policyId} policy={policy} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </List>
  );
};

export default ActivityCard;
