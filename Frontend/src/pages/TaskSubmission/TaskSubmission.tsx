import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FinishedSubmissions from "./components/FinishedSubmissions";
import LoadingSkeleton from "./components/LoadingSkeleton";
import SubmissionForm from "./components/SubmissionForm";
import useGetFocalPointTask from "./hooks/useGetFocalPointTask";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";

const TaskSubmission: FC = () => {
  const { focalPointTaskId: focalPointTaskIdParam } = useParams();

  const theme = useTheme<Theme>();

  const focalPointTaskId = focalPointTaskIdParam ?? "";

  const { departmentId } = useAppSelector(selectUser);

  const { focalPointTask, isFetching } = useGetFocalPointTask(
    departmentId,
    focalPointTaskId,
  );

  if (isFetching) return <LoadingSkeleton />;

  if (!focalPointTask) return null;

  const {
    isFinished,
    monitoringTool: { name },
  } = focalPointTask;

  if (isFinished) return <FinishedSubmissions />;

  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 3 },
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography component="h1" variant="h5" gutterBottom fontWeight="500">
        {name}
      </Typography>
      <Grid
        container
        sx={{
          height: "calc(100vh - 64px - 48px - 43px)",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "column-reverse", md: "space-between" },
        }}
        justifyContent="space-between"
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            pr: 1,
            height: "100%",
            overflowY: "auto",
            ...theme.mixins.niceScroll(),
          }}
        >
          <SubmissionForm focalPointTask={focalPointTask} />
        </Grid>

        <Grid
          item
          display={{ xs: "none", md: "block" }}
          md={4}
          sx={{
            overflowY: "auto",
            height: "100%",
            ...theme.mixins.niceScroll(),
            pl: 2,
            pr: 1,
          }}
        >
          <Stack gap={2}>
            <Paper sx={{ p: 2 }} variant="outlined">
              This is a paper
            </Paper>
            <Paper sx={{ p: 2 }} variant="outlined">
              This is another paper
            </Paper>
            <Paper sx={{ p: 2 }} variant="outlined">
              Here goes another paper
            </Paper>
            <Paper sx={{ p: 2, height: "240px" }} variant="outlined">
              This is a long paper
            </Paper>
            <Paper sx={{ p: 2, height: "240px" }} variant="outlined">
              This is a long paper
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskSubmission;
