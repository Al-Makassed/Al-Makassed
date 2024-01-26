import { Card, CardHeader, List } from "@mui/material";
import { FC } from "react";
import DependencyChunk from "src/components/Chunks/DependencyChunk";
import PolicyChunk from "src/components/Chunks/PolicyChunk";
import {
  FileEntityType,
  FinishedPolicy,
  FinishedDependency,
} from "../API/types";
import useGetRecentReadFiles from "../hooks/useGetRecentReadFiles";

const LastAccessedListCard: FC = () => {
  const { readFiles, isFetching } = useGetRecentReadFiles();

  if (isFetching) return <h2>Loading...</h2>;

  if (!readFiles) return null;

  return (
    <Card>
      <CardHeader title="Last Accessed" subheader="this week" sx={{ p: 1 }} />

      <List
        sx={{
          overflowY: "auto",
          height: "calc(100vh - 64px - 32px - 72.018px)",
          p: 2,
          pt: 0.5,
        }}
      >
        {readFiles?.map((file) =>
          file.type === FileEntityType.Policy ? (
            <PolicyChunk
              key={(file as FinishedPolicy).policyId}
              finishedFile={file as FinishedPolicy}
            />
          ) : (
            <DependencyChunk
              key={(file as FinishedDependency).dependencyId}
              finishedFile={file as FinishedDependency}
            />
          ),
        )}
      </List>
    </Card>
  );
};

export default LastAccessedListCard;
