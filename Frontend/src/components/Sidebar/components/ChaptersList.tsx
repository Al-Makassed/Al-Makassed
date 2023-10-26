import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../API/types";
import { Snackbar, Stack } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  selectSnackbar,
  setSnackbarClose,
  setSnackbarOpen,
} from "src/features/snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);
const ChaptersList = () => {
  const { chapters, isFetching, isError } = useFetchChapters();

  const dispatch = useAppDispatch();

  const { isOpen, message, severity } = useAppSelector(selectSnackbar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbarClose());
  };

  if (isFetching) return <LoaderCell size={38} color="success" />;

  // Done: Replace this with snackbar
  if (isError) {
    dispatch(
      setSnackbarOpen({
        message: "Error fetching chapters -check it out!-",
        severity: "error",
      }),
    );
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ "& .MuiPaper-root": { backgroundColor: "red" } }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: (theme) => theme.palette.grey[200],
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {chapters?.map((chapter: Chapter) => (
          <ChapterListItem key={chapter.id} chapter={chapter} />
        ))}
      </List>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleClose}
          sx={{ "& .MuiPaper-root": { backgroundColor: "green" } }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default ChaptersList;
