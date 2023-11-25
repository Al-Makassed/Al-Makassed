import { Grid } from "@mui/material";
import React, { FC } from "react";
import MonitoringToolsSkeleton from "./MonitoringToolsSkeleton";
import FocalPointTaskCard from "./FocalPointTaskCard";
import { FocalPointTask } from "../API/types";
import useGetFocalPointTasks from "../hooks/userGetFocalPointTasks";
// import { selectUser } from "src/features/user";
// import { useAppSelector } from "src/store/hooks";

const FocalPointTasksList: FC = () => {
  // TODO: Fix it when departmentId is added to the token
  //const { departmentId } = useAppSelector(selectUser);
  const departmentId = "3232a08d-0327-4495-9a49-dfd03148ced6";

  const { focalPointTasks, isFetching } = useGetFocalPointTasks(departmentId);

  return isFetching ? (
    <MonitoringToolsSkeleton />
  ) : (
    <Grid
      container
      spacing={{ xs: 4, md: 4 }}
      columns={{ xs: 2, sm: 2, md: 8, lg: 12 }}
      maxWidth={"85vw"}
    >
      {focalPointTasks?.map((fpt: FocalPointTask) => (
        <Grid item xs={2} sm={4} md={4} key={fpt.id}>
          <FocalPointTaskCard focalPointTask={fpt} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FocalPointTasksList;
