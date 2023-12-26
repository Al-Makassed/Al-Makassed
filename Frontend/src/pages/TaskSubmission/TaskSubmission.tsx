import { Button, Fade, Grid, Stack, Typography } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { selectUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import FinishedSubmissions from "./components/FinishedSubmissions";
import InfoCard from "./components/InformationCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import SubmissionForm from "./components/SubmissionForm";
import useGetFocalPointTask from "./hooks/useGetFocalPointTask";
// import InfoIcon from "@mui/icons-material/Info";

const TaskSubmission: FC = () => {
  const [isDetailsMode, setIsDetailsMode] = useState<boolean>(false);

  const { focalPointTaskId: focalPointTaskIdParam } = useParams();

  const theme = useTheme<Theme>();

  const { isDesktopOrMore } = useMediaQuery();

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

  const handleButtonClick = () => setIsDetailsMode((prev) => !prev);

  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 3 },
        height: "calc(100vh - 64px)",
      }}
    >
      <Stack>
        <Typography component="h1" variant="h5" mb={{ md: 1 }} fontWeight="500">
          {name}
        </Typography>

        <Button
          sx={{
            width: "fit-content",
            textTransform: "none",
            display: { md: "none" },
            p: 0,
            textAlign: "left",
          }}
          // startIcon={<InfoIcon />}
          onClick={handleButtonClick}
        >
          {isDetailsMode ? "Hide details" : "See details"}
        </Button>
      </Stack>

      <Grid
        container
        sx={{
          height: "calc(100vh - 64px - 48px - 43px)",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "column-reverse", md: "space-between" },
        }}
        justifyContent="space-between"
        mt={1.5}
      >
        {(!isDetailsMode || isDesktopOrMore) && (
          <Fade in={!isDetailsMode || isDesktopOrMore} timeout={400}>
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
              {isFinished && <FinishedSubmissions />}

              {!isFinished && (
                <SubmissionForm focalPointTask={focalPointTask} />
              )}
            </Grid>
          </Fade>
        )}

        <Fade in={isDetailsMode || isDesktopOrMore} timeout={400}>
          <Grid
            item
            display={{ xs: isDetailsMode ? "block" : "none", md: "block" }}
            md={4}
            sx={{
              overflowY: "auto",
              height: "100%",
              ...theme.mixins.niceScroll(),
              pl: 2,
              pr: 1,
            }}
          >
            <InfoCard task={focalPointTask} />
          </Grid>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default TaskSubmission;
