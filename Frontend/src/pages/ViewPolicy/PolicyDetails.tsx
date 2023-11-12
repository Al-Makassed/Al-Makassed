import React, { FC } from "react";
import ViewPolicyInfo from "./components/ViewPolicyInfo";
import useFetchPolicies from "./hooks/useGetPolicies";
import { Policy } from "./API/types";
import { Stack } from "@mui/material";
import LoaderCell from "src/components/LoaderCell";

const PolicyDetails: FC = () => {
  const { policies, isFetching } = useFetchPolicies();

  if (isFetching) return <LoaderCell size={38} color="success" />;

  return (
    <Stack>
      {policies?.map((policy: Policy) => (
        <ViewPolicyInfo key={policy.code} policy={policy} />
      ))}
    </Stack>
  );
};

export default PolicyDetails;