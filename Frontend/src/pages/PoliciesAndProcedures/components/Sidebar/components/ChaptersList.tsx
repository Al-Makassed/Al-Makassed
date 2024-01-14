import List from "@mui/material/List";
import EmptyList from "src/components/EmptyList";
import LoaderCell from "src/components/LoaderCell";
import { selectIsManagerUser } from "src/features/user";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";
import { useAppSelector } from "src/store/hooks";
import { Chapter } from "../API/types";
import useFetchChapters from "../hooks/useGetChapters";
import ChapterListItem from "./ChapterListItem";
import { Stack } from "@mui/material";

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
      {chapters?.length === 0 && (
        <Stack height="calc(100vh - 172px)" justifyContent="center">
          <EmptyList type="chapter" />
        </Stack>
      )}

      {chapters!.length > 0 &&
        chapters!.map(
          (chapter: Chapter) =>
            (isManager || chapter.enableState) && (
              <ChapterListItem key={chapter.id} chapter={chapter} />
            ),
        )}
    </List>
  );
};

export default ChaptersList;
