import { Grid } from "@mui/material";
import { FC } from "react";
import { FocalPointTask } from "../API/types";
import useGetFocalPointTasks from "../hooks/userGetFocalPointTask";
import FocalPointTaskCard from "./FocalPointTaskCard";
import LoadingSkeleton from "./GridLoadingSkeleton";
// import { selectUser } from "src/features/user";
// import { useAppSelector } from "src/store/hooks";

const FocalPointTasksGrid: FC = () => {
  // TODO: Fix it when departmentId is added to the token
  //const { departmentId } = useAppSelector(selectUser);
  const departmentId = "3232a08d-0327-4495-9a49-dfd03148ced6";

  const { focalPointTasks, isFetching } = useGetFocalPointTasks(departmentId);

  if (isFetching) return <LoadingSkeleton key="FocalPointTasksGrid" />;

  if (!focalPointTasks) return null;

  return (
    <Grid container gap={3}>
      {focalPointTasks.map((task: FocalPointTask) => (
        <Grid
          item
          key={task.id}
          sx={{
            width: {
              xs: "100%",
              sm: "calc((100% - 24px) / 2)",
              md: "calc((100% - 48px) / 3)",
              xl: "calc((100% - 72px) / 4)",
            },
          }}
        >
          <FocalPointTaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FocalPointTasksGrid;
