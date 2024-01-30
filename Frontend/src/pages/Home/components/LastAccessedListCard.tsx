import {
  Card,
  List,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import DependencyChunk from "src/components/Chunks/DependencyChunk";
import PolicyChunk from "src/components/Chunks/PolicyChunk";
import {
  FileEntityType,
  FinishedDependency,
  FinishedPolicy,
} from "../API/types";
import useGetRecentReadFiles from "../hooks/useGetRecentReadFiles";
import EmptyList from "./EmptyList";

const LastAccessedListCard: FC = () => {
  const { readFiles, isFetching } = useGetRecentReadFiles();

  const theme = useTheme<Theme>();

  if (isFetching)
    return (
      <Skeleton variant="rounded" height={"calc(100vh - 64px - 32px - 12px)"} />
    );

  if (!readFiles) return null;

  return (
    <Card sx={{ borderRadius: 2.5 }}>
      <Stack py={1} px={2.5}>
        <Typography variant="h6">Last Accessed</Typography>
        <Typography variant="caption" color="GrayText" mt={-0.75}>
          this week
        </Typography>
      </Stack>

      {readFiles.length === 0 && (
        <EmptyList label={"You haven't browsed any files this week."} />
      )}

      {readFiles.length !== 0 && (
        <List
          sx={{
            overflowY: "auto",
            maxHeight: {
              xs: "100%",
              lg: "calc(100vh - 64px - 32px - 72.018px)",
            },
            p: 2,
            pt: 0.5,
            ...theme.mixins.niceScroll(),
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
      )}
    </Card>
  );
};

export default LastAccessedListCard;
