import { Stack, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { Policy } from "../API/types";
import DetailsPanel from "./DetailsPanel";

export interface DetailsTabsProps {
  policy: Policy;
}

const DetailsTabs: FC<DetailsTabsProps> = ({ policy }) => {
  const [value, setValue] = useState(0);

  // const policyDependencies =
  //   policy?.dependencies.filter(
  //     (dependency) => dependency.type === PolicyDependencyType.Form
  //   ) ?? [];

  // const isManager = useAppSelector(selectIsManagerUser);

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
        aria-label="scrollable auto tabs example"
        sx={{ gap: 3 }}
      >
        <Tab sx={{ mr: 1 }} label="Details" />
        <Tab sx={{ mr: 1 }} label="Forms" />
        <Tab sx={{ mr: 1 }} label="Posters" />
        <Tab sx={{ mr: 1 }} label="protocols" />
        <Tab label="progress" />
      </Tabs>

      <DetailsPanel value={value} policy={policy} />
    </Stack>
  );
};

export default DetailsTabs;
