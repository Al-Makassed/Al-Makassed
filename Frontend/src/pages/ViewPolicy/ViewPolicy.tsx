import React, { FC } from "react";
import ViewPolicyinfo from "./components/ViewPolicyInfo";
import useFetchPolicies from "./hooks/useGetPolicies";
import { Policy } from "./API/types";
import { Stack } from "@mui/material";
import LoaderCell from "src/components/LoaderCell";

const ViewPolicy: FC = () => {
  const { policies, isFetching } = useFetchPolicies();

  if (isFetching) return <LoaderCell size={38} color="success" />;

  return (
    <Stack>
      {policies?.map((policy: Policy) => (
        <ViewPolicyinfo key={policy.code} policy={policy} />
      ))}
    </Stack>
  );
};

export default ViewPolicy;
