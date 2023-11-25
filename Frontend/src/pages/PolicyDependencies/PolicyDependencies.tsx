import React, { FC } from "react";
import { Stack } from "@mui/material";
import { PolicyDependenciesProps } from "./types";
import FormsList from "./Components/FormsList";
import ProtocolsList from "./Components/ProtocolList";
import PostersList from "./Components/PostersList";

const PolicyDependencies: FC<PolicyDependenciesProps> = ({
  chapterId,
  policyId,
}) => {
  return (
    <Stack sx={{ p: 4 }} spacing={5} direction={{ xs: "column", md: "row" }}>
      <FormsList chapterId={chapterId} policyId={policyId} />
      <PostersList chapterId={chapterId} policyId={policyId} />
      <ProtocolsList chapterId={chapterId} policyId={policyId} />
    </Stack>
  );
};

export default PolicyDependencies;
