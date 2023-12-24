import styled from "@emotion/styled";
import { Box, Card, CardContent, Tab, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { InformationCardProps } from "../types";
import DetailsPanel from "./DetailsPanel";

const StyledTab = styled(Tab)(() => ({
  flexGrow: 1,
  flexBasis: 0,
  textTransform: "none",
}));

const InformationCard: FC<InformationCardProps> = ({ task }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, value: number) => {
    setValue(value);
  };

  const {
    totalSubmissions,
    monitoringTool: { description },
  } = task;

  return (
    <Card>
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
      </CardContent>
    </Card>
  );
};

export default InformationCard;
