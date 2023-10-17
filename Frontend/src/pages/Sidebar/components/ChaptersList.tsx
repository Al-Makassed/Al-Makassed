import React from "react";
import List from "@mui/material/List";
import { CHAPTERS } from "../fixtures";
import ChapterListItem from "./ChapterListItem";

const ChaptersList = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: (theme) => theme.palette.grey[200],
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {CHAPTERS.map((chapter, index) => (
        <ChapterListItem key={index} chapter={chapter} />
      ))}
    </List>
  );
};

export default ChaptersList;
