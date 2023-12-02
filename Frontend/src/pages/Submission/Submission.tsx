import React from "react";
import useGetFocalPointTask from "./hooks/useGetFocalPointTask";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import Header from "./Header/Header";

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
  return (
    <>
      {isFetching ? (
        <h1>Loading...</h1>
      ) : (
        <Stack
          alignItems={"center"}
          sx={{ p: 4 }}
          width={"70%"}
          margin={"auto"}
          gap={3}
        >
          <Header focalPointTask={focalPointTask!} />
          {/* <Box bgcolor={"red"} width={700} height={300}></Box> */}
        </Stack>
      )}
    </>
  );
};

export default Submission;
