import { Card, CardHeader, List } from "@mui/material";
import RecentCreatedDependencyChunk from "src/components/Chunks/RecentCreatedDependencyChunk";
import RecentCreatedPolicyChunk from "src/components/Chunks/RecentCreatedPolicyChunk";
import { DependencyFileEntity, FileEntityType } from "../API/types";
import useGetFileEntities from "../hooks/useGetFileEntities";

const RecentlyAddedCard = () => {
  const { fileEntity, isFetching } = useGetFileEntities();

  if (isFetching) return <h2>Loading...</h2>;

  if (!fileEntity) return null;

  return (
    <Card>
      <CardHeader
        title="Recently Added"
        sx={{ py: 1, borderBottom: "1px solid lightGray" }}
      />

      <List
        sx={{
          overflowY: "auto",
          height: "calc(100vh - 64px - 32px - 154px - 11px - 48.018px)",
          gap: 1.5,
          p: 1.5,
        }}
      >
        {fileEntity?.map((file) =>
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
    </Card>
  );
};

export default RecentlyAddedCard;
