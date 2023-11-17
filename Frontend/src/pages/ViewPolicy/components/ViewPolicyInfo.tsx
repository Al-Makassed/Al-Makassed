import React, { FC } from "react";
import { Typography, Stack, Link, Tooltip, IconButton } from "@mui/material";
import { ViewPolicyInfoProps } from "../types";
import PolicyDependency from "src/pages/PolicyDependency";
import { useParams } from "react-router";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const ViewPolicyInfo: FC<ViewPolicyInfoProps> = ({ policy }) => {
  const { code } = useParams();

  const navigate = useNavigate();

  const handleEditPolicy = () => {
    navigate(`/me/edit-policy&dependencies/${policy.code}`);
  };

  if (policy.code !== code) return null;

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
        {/* <Tooltip title="Edit Dependencies">
            <IconButton
              aria-label="Edit Dependencies"
              // sx={{ mr: 1 }}
              onClick={handleEditPolicy}
            >
              <EditIcon />
            </IconButton>
          </Tooltip> */}
      </Stack>
      <PolicyDependency />
    </Stack>
  );
};
export default ViewPolicyInfo;
