import React, { FC } from "react";
import { Typography, Stack, Link } from "@mui/material";
import { ViewPolicyInfoProps } from "../types";
import PolicyDependency from "src/pages/PolicyDependency";
import { useParams } from "react-router";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

const ViewPolicyInfo: FC<ViewPolicyInfoProps> = ({ policy }) => {
  const { code } = useParams();

  if (policy.code === code) {
    return (
      <Stack alignItems="center">
        <Stack textAlign="center" my={8}>
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            {policy.code}
          </Typography>
          <Typography
            fontWeight={600}
            variant="h5"
            sx={{ color: (theme) => theme.palette.maqasid.primary }}
            lineHeight={1.5}
          >
            {policy.name}
          </Typography>

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

        <PolicyDependency />
      </Stack>
    );
  }
};
export default ViewPolicyInfo;
