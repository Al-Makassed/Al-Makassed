import { List, Stack } from "@mui/material";
import { FC } from "react";
import useGetFinishedPolicies from "../../hooks/useGetFinishedPolicies";
import PolicyProgressChunk from "./PolicyProgressChunk";

const PoliciesProgressCard: FC = () => {
  const { policies, isFetching } = useGetFinishedPolicies("");

  if (isFetching) return <div>Loading...</div>;

  if (!policies) return null;

  return (
    <List>
      <Stack gap={2}>
        {policies.map((policy) => (
          <PolicyProgressChunk key={policy.policyId} policy={policy} />
        ))}
      </Stack>
    </List>
  );
};

export default PoliciesProgressCard;
