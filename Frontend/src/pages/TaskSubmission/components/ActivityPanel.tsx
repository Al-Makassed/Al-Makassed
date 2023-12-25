import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TabPanel from "src/components/TabPanel";
import { Submission } from "../API/types";
import useGetTaskSubmissions from "../hooks/useGetTaskSubmissions";
import { ActivityPanelProps } from "../types";
import { findCurrentMonthSubmissions, findOlderSubmissions } from "../utils";
import ActivitySegment from "./ActivitySegment";

const ActivityPanel: FC<ActivityPanelProps> = ({
  value,
  departmentId,
  focalPointTaskId,
}) => {
  const { submissions, isFetching } = useGetTaskSubmissions(
    departmentId,
    focalPointTaskId,
  );

  if (isFetching) return <Typography>Loading...</Typography>;

  if (!submissions) return null;

  const currentMonthSubmissions = findCurrentMonthSubmissions(submissions);

  const olderSubmissions = findOlderSubmissions(submissions);

  const submissionsArrays: Submission[][] = [
    currentMonthSubmissions,
    olderSubmissions,
  ];

  return (
    <TabPanel value={value} index={1} p={3} pb={0}>
      <Stack gap={2}>
        {submissionsArrays.map(
          (submissionsArray, index) =>
            submissionsArray.length > 0 && (
              <Stack gap={1.5} key={index}>
                <Typography
                  borderBottom={1}
                  pb={0.3}
                  borderColor={(theme) => theme.palette.grey[300]}
                >
                  {submissionsArray[0].submittedAt.split("-")[1] ===
                  (new Date().getMonth() + 1).toString()
                    ? "This Month"
                    : "Older"}
                </Typography>

                <Stack gap={2}>
                  {submissionsArray.map((submission) => (
                    <ActivitySegment
                      key={submission.id}
                      submission={submission}
                    />
                  ))}
                </Stack>
              </Stack>
            ),
        )}
      </Stack>
    </TabPanel>
  );
};

export default ActivityPanel;
