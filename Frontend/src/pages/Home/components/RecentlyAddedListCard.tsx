import {
  Card,
  List,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import RecentCreatedDependencyChunk from "src/components/Chunks/RecentCreatedDependencyChunk";
import RecentCreatedPolicyChunk from "src/components/Chunks/RecentCreatedPolicyChunk";
import { DependencyFileEntity, FileEntityType } from "../API/types";
import useGetFileEntities from "../hooks/useGetFileEntities";
import EmptyList from "./EmptyList";

export const RecentlyAddedListCard = () => {
  const { fileEntities, isFetching } = useGetFileEntities();

  const theme = useTheme<Theme>();

  if (isFetching)
    return <Skeleton variant="rounded" height={"calc(100vh - 266.018px)"} />;

  if (!fileEntities) return null;

  return (
    <Card sx={{ borderRadius: 2.5 }}>
      <Stack py={1} px={2.5}>
        <Typography variant="h6">Recently Added</Typography>
        <Typography variant="caption" color="GrayText" mt={-0.75}>
          this week
        </Typography>
      </Stack>

      {fileEntities.length === 0 && (
        <EmptyList label={"No files were uploaded this week."} />
      )}

      {fileEntities.length !== 0 && (
        <List
          sx={{
            overflowY: "auto",
            maxHeight: {
              lg: "calc(100vh - 64px - 16px - 154px - 32px - 62px)",
            },
            p: 1.5,
            pt: 0.5,
            ...theme.mixins.niceScroll(),
          }}
        >
          {fileEntities?.map((file) =>
            file.type === FileEntityType.Policy ? (
              <RecentCreatedPolicyChunk
                key={file.id}
                id={file.id}
                name={file.name}
                chapterId={file.chapterId}
                chapterName={file.chapterName}
                lastAccessed={file.createdAt}
              />
            ) : (
              <RecentCreatedDependencyChunk
                key={file.id}
                id={file.id}
                name={file.name}
                pdfUrl={(file as DependencyFileEntity).PdfUrl}
                chapterName={file.chapterName}
                lastAccessed={file.createdAt}
                policyName={(file as DependencyFileEntity).policyName}
              />
            ),
          )}
          {fileEntities?.map((file) =>
            file.type === FileEntityType.Policy ? (
              <RecentCreatedPolicyChunk
                key={file.id}
                id={file.id}
                name={file.name}
                chapterId={file.chapterId}
                chapterName={file.chapterName}
                lastAccessed={file.createdAt}
              />
            ) : (
              <RecentCreatedDependencyChunk
                key={file.id}
                id={file.id}
                name={file.name}
                pdfUrl={(file as DependencyFileEntity).PdfUrl}
                chapterName={file.chapterName}
                lastAccessed={file.createdAt}
                policyName={(file as DependencyFileEntity).policyName}
              />
            ),
          )}
        </List>
      )}
    </Card>
  );
};

export default RecentlyAddedListCard;
