import React, { FC } from "react";
import useGetPolicy from "./hooks/useGetPolicy";
import { Stack, Typography, Link, Tooltip, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PolicyDependencies from "src/pages/PolicyDependencies";
import PolicyDetailsLoadingSkeleton from "./components/PolicyDetailsLoadingSkeleton";
import EditIcon from "@mui/icons-material/Edit";

const PolicyDetails: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy, isFetching } = useGetPolicy(chapterId, policyId);

  const navigate = useNavigate();

  const handleEditPolicy = () => {
    navigate(`/me/chapters/${policy?.chapterId}/policies/${policy?.id}/edit`);
  };

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
          <Typography
            fontWeight={600}
            variant="h5"
            sx={{ color: (theme) => theme.palette.maqasid.primary }}
          >
            {policy.name}
          </Typography>
          <Tooltip title="Edit Policy">
            <IconButton
              aria-label="Edit Policy"
              sx={{ mr: 1 }}
              onClick={handleEditPolicy}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Link
          target="_blank"
          rel="noopener"
          href={policy.pdfUrl}
          underline="none"
          display="flex"
          flexDirection="row"
          gap={1}
          justifyContent="center"
        >
          <PictureAsPdfOutlinedIcon sx={{ color: "red" }} />
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            get policy&apos;s pdf
          </Typography>
        </Link>
      </Stack>

      <PolicyDependencies />
    </Stack>
  );
};

export default PolicyDetails;
