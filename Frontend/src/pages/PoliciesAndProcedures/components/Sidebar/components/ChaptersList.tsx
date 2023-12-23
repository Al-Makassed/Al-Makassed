import React from "react";
import List from "@mui/material/List";
import ChapterListItem from "./ChapterListItem";
import { Chapter } from "../API/types";
import LoaderCell from "src/components/LoaderCell";
import useFetchChapters from "../hooks/useGetChapters";
import { useAppSelector } from "src/store/hooks";
import { selectIsManagerUser } from "src/features/user";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const ChaptersList = () => {
  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  const { chapters, isFetching } = useFetchChapters(isSidebarOpen);

  const isManager = useAppSelector(selectIsManagerUser);

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
      {chapters?.map(
        (chapter: Chapter) =>
          (isManager || chapter.enableState) && (
            <ChapterListItem key={chapter.id} chapter={chapter} />
          ),
      )}
    </List>
  );
};

export default ChaptersList;
