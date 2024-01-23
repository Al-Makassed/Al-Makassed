import { FC } from "react";
import TabPanel from "src/components/TabPanel";
import { Policy } from "../API/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import KeyIcon from "@mui/icons-material/VpnKey";
import SubjectIcon from "@mui/icons-material/Subject";
import useFinishReadingPolicy from "../hooks/useFinishReadingPolicy";

export interface DetailsPanelProps {
  value: number;
  policy: Policy;
}

const DetailsPanel: FC<DetailsPanelProps> = ({ value, policy }) => {
  const { code, summary, pdfUrl } = policy;

  const { finishPolicy } = useFinishReadingPolicy();

  const handleFinishReadingPolicy = () => {
    finishPolicy(policy.id);
  };

  return (
    <TabPanel value={value} index={0} py={3}>
      <Stack gap={3.5}>
        <Stack gap={1.5}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <KeyIcon sx={{ fontSize: "1.25rem", color: "GrayText" }} />
            <Typography variant="subtitle1">Code:</Typography>
          </Stack>
          <Typography
            bgcolor={(theme) => theme.palette.grey[200]}
            px={1.5}
            py={0.7}
            borderRadius={1.5}
            borderColor={(theme) => theme.palette.grey[300]}
            width={"fit-content"}
            minWidth={"min(120px, 100%)"}
            variant="body1"
          >
            {code}
          </Typography>
        </Stack>

        <Stack gap={1}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <SubjectIcon sx={{ fontSize: "1.25rem", color: "GrayText" }} />
            <Typography variant="subtitle1">Summary:</Typography>
          </Stack>

          {summary && (
            <Box
              bgcolor={(theme) => theme.palette.grey[200]}
              px={2}
              py={1.25}
              borderRadius={1.5}
              borderColor={(theme) => theme.palette.grey[300]}
              width={"min(600px, 100%)"}
            >
              <Typography variant="body1">{summary}</Typography>
            </Box>
          )}
          {!summary && (
            <Typography
              variant="caption"
              color="GrayText"
              sx={{
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              No summary available yet.
            </Typography>
          )}
        </Stack>

        <Stack>
          <Button
            onClick={handleFinishReadingPolicy}
            startIcon={<PictureAsPdfIcon />}
            href={pdfUrl}
            target="_blank"
            sx={{ width: "fit-content", textTransform: "none" }}
          >
            Open Policy File
          </Button>
        </Stack>
      </Stack>
    </TabPanel>
  );
};

export default DetailsPanel;
