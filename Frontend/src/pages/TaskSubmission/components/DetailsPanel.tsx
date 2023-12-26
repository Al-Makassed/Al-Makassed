import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import TabPanel from "src/components/TabPanel";
import { DetailsPanelProps } from "../types";
import { totalTimeLeftInMonth } from "../utils";
import FunctionsIcon from "@mui/icons-material/Functions";

const DetailsPanel: FC<DetailsPanelProps> = ({
  value,
  totalSubmissions,
  description,
}) => {
  const timeLeft = totalTimeLeftInMonth();

  const submissionsLeft = 14 - totalSubmissions;

  return (
    <TabPanel
      value={value}
      index={0}
      gap={3}
      p={3}
      pb={0}
      display="flex"
      flexDirection={"column"}
    >
      {/* Total Submissions Section */}
      <Box>
        <Stack
          pb={0.3}
          direction="row"
          borderBottom={1}
          borderColor={(theme) => theme.palette.grey[300]}
        >
          <Typography variant="body1">Total Submissions</Typography>
          <Chip
            label={`${totalSubmissions}/14`}
            icon={<FunctionsIcon sx={{ fontSize: "1rem" }} />}
            sx={{
              height: "fit-content",
              py: 0.1,
              ml: "auto",
              color: "primary.main",
              fontSize: "0.88rem",
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          lineHeight={1.65}
          // textAlign="justify"
        >
          You have {submissionsLeft} submissions left;{" "}
          {submissionsLeft === 1 ? "it" : "they"} should be submitted in{" "}
          {timeLeft}.
        </Typography>
      </Box>

      {/* Description Section */}
      <Box>
        <Typography
          variant="body1"
          pb={0.3}
          borderBottom={1}
          borderColor={(theme) => theme.palette.grey[300]}
        >
          Description
        </Typography>

        <Typography variant="body2" mt={2} lineHeight={1.65}>
          {description}
        </Typography>
      </Box>
    </TabPanel>
  );
};

export default DetailsPanel;
