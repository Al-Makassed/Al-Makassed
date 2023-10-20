import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { fetchData } from "../fetchData";

const ChaptersList = () => {
  const {
    data: chapter,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchData(),
    queryKey: ["chapters"],
    // staleTime:5000,
  });

  if (isLoading) {
    return <Typography variant="subtitle1">Loading...</Typography>;
  }
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
      {chapter?.map((chapter: Chapter) => (
        <ChapterListItem key={chapter.id} chapter={chapter} />
      ))}
    </List>
  );
};

export default ChaptersList;
