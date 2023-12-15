import { Grid, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FinishedSubmissions from "./components/FinishedSubmissions";
import LoadingSkeleton from "./components/LoadingSkeleton";
import SubmissionForm from "./components/SubmissionForm";
import useGetFocalPointTask from "./hooks/useGetFocalPointTask";

const TaskSubmission: FC = () => {
  const { focalPointTaskId: focalPointTaskIdParam } = useParams();

  const theme = useTheme<Theme>();

  const focalPointTaskId = focalPointTaskIdParam ?? "";

  // TODO: Fix it when departmentId is added to the token
  //const { departmentId } = useAppSelector(selectUser);
  const departmentId = "3232a08d-0327-4495-9a49-dfd03148ced6";

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

  return (
    <Grid
      container
      sx={{ bgcolor: "grey.100", p: 3, height: "calc(100vh - 64px)" }}
    >
      {isFinished && <FinishedSubmissions />}
      {!isFinished && (
        <>
          <Typography component="h1" variant="h4" gutterBottom>
            {name}
          </Typography>
          <Grid container gap={2}>
            <Grid
              item
              xs={8}
              sx={{
                pr: 2,
                height: "calc(100vh - 64px - 48px - 42px)",
                overflowY: "auto",
                ...theme.mixins.niceScroll(),
              }}
            >
              <SubmissionForm focalPointTask={focalPointTask} />
            </Grid>
            <Grid item xs={3}>
              Right
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TaskSubmission;
