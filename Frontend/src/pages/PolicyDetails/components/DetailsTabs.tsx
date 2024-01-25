import { Stack, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import TabPanel from "src/components/TabPanel";
import { PolicyDependencyType } from "src/pages/PolicyDependencies/constants";
import { Policy } from "../API/types";
import DependenciesList from "./DependenciesList";
import DetailsPanel from "./DetailsPanel";

export interface DetailsTabsProps {
  policy: Policy;
}

const DetailsTabs: FC<DetailsTabsProps> = ({ policy }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="policy details tabs"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab sx={{ mr: 1 }} label="Details" />
        <Tab sx={{ mr: 1 }} label="Forms" />
        <Tab sx={{ mr: 1 }} label="Posters" />
        <Tab sx={{ mr: 1 }} label="protocols" />
        <Tab label="progress" />
      </Tabs>

      <DetailsPanel value={value} policy={policy} />

      <TabPanel index={1} value={value}>
        <DependenciesList
          chapterId={policy.chapterId}
          policyId={policy.id}
          type={PolicyDependencyType.Form}
        />
      </TabPanel>

      <TabPanel index={2} value={value}>
        <DependenciesList
          chapterId={policy.chapterId}
          policyId={policy.id}
          type={PolicyDependencyType.Poster}
        />
      </TabPanel>

      <TabPanel index={3} value={value}>
        <DependenciesList
          chapterId={policy.chapterId}
          policyId={policy.id}
          type={PolicyDependencyType.Protocol}
        />
      </TabPanel>
    </Stack>
  );
};

export default DetailsTabs;
