import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import TabPanel from "src/components/TabPanel";
import { DetailsPanelProps } from "../types";
import { totalTimeLeftInMonth } from "../utils";

const DetailsPanel: FC<DetailsPanelProps> = ({
  value,
  totalSubmissions,
  description,
}) => {
  const timeLeft = totalTimeLeftInMonth();

  return (
    <TabPanel
      value={value}
      index={0}
      sx={{ p: 3 }}
      gap={3}
      display="flex"
      flexDirection={"column"}
    >
      {/* Total Submissions Section */}
      <Box>
        <Stack
          direction="row"
          borderBottom={1}
          borderColor={(theme) => theme.palette.grey[300]}
        >
          <Typography variant="body1">Total Submissions</Typography>
          <Typography
            variant="body2"
            component={"div"}
            sx={{ ml: "auto" }}
            display={"flex"}
            alignItems={"center"}
            gap={0.5}
          >
            {totalSubmissions}
            <Box color={"primary.main"}>/ 14</Box>
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          lineHeight={1.65}
          textAlign="justify"
        >
          You have {14 - totalSubmissions} submissions left; they should be
          submitted in {timeLeft}.
        </Typography>
      </Box>

      {/* Description Section */}
      <Box>
        <Stack
          direction="row"
          borderBottom={1}
          borderColor={(theme) => theme.palette.grey[300]}
        >
          <Typography variant="body1">Description</Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2 }} lineHeight={1.65}>
          {description}
        </Typography>
      </Box>
    </TabPanel>
  );
};

export default DetailsPanel;
