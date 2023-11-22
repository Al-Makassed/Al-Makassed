import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../API/types";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";
import { useAppSelector } from "src/store/hooks";
import { selectIsSidebarOpen } from "src/features/appSettings";

const ChaptersList = () => {
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const { chapters, isFetching } = useFetchChapters(isSidebarOpen);

  if (isFetching) return <LoaderCell size={38} />;

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
