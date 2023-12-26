import { Box, Card, CardContent, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, SyntheticEvent, useState } from "react";
import { InformationCardProps } from "../types";
import ActivityPanel from "./ActivityPanel";
import DetailsPanel from "./DetailsPanel";

const StyledTab = styled(Tab)(() => ({
  flexGrow: 1,
  flexBasis: 0,
  textTransform: "none",
}));

const InformationCard: FC<InformationCardProps> = ({ task }) => {
  const [value, setValue] = useState<number>(0);

  const {
    id,
    departmentId,
    totalSubmissions,
    monitoringTool: { description },
  } = task;

  const handleChange = (event: SyntheticEvent, value: number) => {
    setValue(value);
  };

  return (
    <Card sx={{ minHeight: "calc(100vh - 64px - 91px)" }}>
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Task Info Tabs"
            sx={{ width: "100%", display: "flex", textTransform: "none" }}
          >
            <StyledTab label="Details" />
            <StyledTab label="Activity" />
          </Tabs>
        </Box>

        <DetailsPanel
          value={value}
          totalSubmissions={totalSubmissions}
          description={description}
        />

        <ActivityPanel
          value={value}
          departmentId={departmentId}
          focalPointTaskId={id}
        />
      </CardContent>
    </Card>
  );
};

export default InformationCard;
