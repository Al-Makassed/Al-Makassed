import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../API/types";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";
import { useAppDispatch } from "src/app/hooks";
import { setSnackbarOpen } from "src/features/snackbar";
import Snackbar from "../../Snackbar/Snackbar";

const ChaptersList = () => {
  const { chapters, isFetching, isError } = useFetchChapters();

  const dispatch = useAppDispatch();

  if (isFetching) return <LoaderCell size={38} color="success" />;

  if (isError) {
    dispatch(
      setSnackbarOpen({
        message: "Error fetching chapters -check it out!-",
        severity: "error",
      }),
    );
    return <Snackbar />;
  }

  return (
    <>
      <List
        sx={{
          width: "100%",
          // bgcolor: (theme) => theme.palette.grey[200],
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {chapters?.map((chapter: Chapter) => (
          <ChapterListItem key={chapter.id} chapter={chapter} />
        ))}
      </List>
      <Snackbar />
    </>
  );
};

export default ChaptersList;
