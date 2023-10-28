import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../API/types";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";

const ChaptersList = () => {
  const { chapters, isFetching } = useFetchChapters();

  if (isFetching) return <LoaderCell size={38} color="success" />;

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
