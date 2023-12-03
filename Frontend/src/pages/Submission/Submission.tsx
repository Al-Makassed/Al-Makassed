import React from "react";
import useGetFocalPointTask from "./hooks/useGetFocalPointTask";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import Header from "./components/Header/Header";
import FieldsList from "./components/FieldsList";

const Submission = () => {
  const { focalPointTaskId: focalPointTaskIdParam } = useParams();

  const focalPointTaskId = focalPointTaskIdParam ?? "";

  // TODO: Fix it when departmentId is added to the token
  //const { departmentId } = useAppSelector(selectUser);
  const departmentId = "3232a08d-0327-4495-9a49-dfd03148ced6";

  const { focalPointTask, isFetching } = useGetFocalPointTask(
    departmentId,
    focalPointTaskId,
  );

  if (isFetching) return <h1>Loading...</h1>;

  if (!focalPointTask) return null;

  return (
    <Stack
      alignItems={"center"}
      sx={{ p: 4 }}
      width={{ xs: "100%", md: "70%" }}
      margin={"auto"}
      gap={3}
    >
      <Header focalPointTask={focalPointTask} />
      <FieldsList focalPointTask={focalPointTask} />
    </Stack>
  );
};

export default Submission;
