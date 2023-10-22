import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../types";
import { Alert, AlertTitle } from "@mui/material";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";

const ChaptersList = () => {
  const { chapters, isFetching, isError } = useFetchChapters();

  if (isFetching) return <LoaderCell size={38} color="success" />;

  // TODO: Replace this with snackbar
  if (isError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Error fetching chapters <strong>-check it out!-</strong>
      </Alert>
    );
  }

  return (
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
  );
};

export default ChaptersList;
