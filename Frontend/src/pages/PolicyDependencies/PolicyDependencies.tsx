import { Stack } from "@mui/material";
import { FC } from "react";
import DependenciesList from "./Componentss/DependenciesList";
import { PolicyDependencyType } from "./constants";
import { PolicyDependenciesProps } from "./types";

const PolicyDependencies: FC<PolicyDependenciesProps> = ({
  chapterId,
  policyId,
}) => {
  return (
    <Stack sx={{ p: 4 }} spacing={5} direction={{ xs: "column", md: "row" }}>
      <DependenciesList
        chapterId={chapterId}
        policyId={policyId}
        type={PolicyDependencyType.Form}
        key="Forms"
      />
      <DependenciesList
        chapterId={chapterId}
        policyId={policyId}
        type={PolicyDependencyType.Poster}
        key="Posters"
      />
      <DependenciesList
        chapterId={chapterId}
        policyId={policyId}
        type={PolicyDependencyType.Protocol}
        key="Protocols"
      />
    </Stack>
  );
};

export default PolicyDependencies;
