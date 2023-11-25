import React, { FC, useState } from "react";
import useGetPolicy from "./hooks/useGetPolicy";
import { Stack, Typography, Tooltip, IconButton, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import PolicyDependencies from "src/pages/PolicyDependencies";
import PolicyDetailsLoadingSkeleton from "./components/PolicyDetailsLoadingSkeleton";
import EditIcon from "@mui/icons-material/Edit";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import EditPolicyAndDependenciesDialog from "../EditPolicyAndDependenciesDialog";

const PolicyDetails: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy, isFetching } = useGetPolicy(chapterId, policyId);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  if (isFetching) return <PolicyDetailsLoadingSkeleton />;

  if (!policy) return null;

  return (
    <Stack alignItems="center" pt={8} gap={3}>
      <Stack textAlign="center" gap={1}>
        <Typography
          variant="subtitle1"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          {policy.code}
        </Typography>
        <Stack direction="row">
          <Typography fontWeight={600} variant="h5">
            {policy.name}
          </Typography>
          <Tooltip title="Edit Policy">
            <IconButton
              aria-label="Edit Policy"
              sx={{ mr: 1 }}
              onClick={handleOpenDialog}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <EditPolicyAndDependenciesDialog
            open={isDialogOpen}
            chapterId={chapterId}
            policyId={policyId}
            onClose={handleCloseDialog}
          />
        </Stack>

        <Button
          startIcon={<FileOpenIcon />}
          href={policy.pdfUrl}
          target="_blank"
          variant="contained"
        >
          Open Policy File
        </Button>
      </Stack>

      <PolicyDependencies />
    </Stack>
  );
};

export default PolicyDetails;
