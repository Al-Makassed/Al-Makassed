import React, { FC, useState } from "react";
// import useGetPolicy from "src/pages/EditPolicyAndDependenciesForm/hooks/useGetPolicy";
import { PolicyDependencyType } from "../constants";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
// import { Dependency } from "src/pages/EditPolicyAndDependenciesForm/API/types";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PolicyDependenciesProps } from "../types";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import AddPolicyDependencyDialog from "./AddPolicyDependencyDialog";
import useGetPolicy from "src/pages/EditPolicyAndDependenciesDialog/hooks/useGetPolicy";
import { Dependency } from "src/pages/EditPolicyAndDependenciesDialog/API/types";

const ProtocolsList: FC<PolicyDependenciesProps> = ({
  chapterId,
  policyId,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const { policy } = useGetPolicy({ chapterId, policyId });
  const policyProtocols =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Protocol,
    ) ?? [];

  return (
    <Stack>
      <Accordion
        sx={{
          bgcolor: "grey.200",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Protocol</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={3}>
            <Stack>
              {policyProtocols.map((policyProtocol: Dependency, index) => (
                <Stack direction="row" key={index}>
                  <FileOpenIcon sx={{ ml: 1 }} />
                  <Button
                    href={policyProtocol.pdfUrl}
                    target="_blank"
                    sx={{ color: "black" }}
                  >
                    {policyProtocol.name}
                  </Button>
                </Stack>
              ))}
            </Stack>

            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={handleOpenDialog}
              >
                Add Protocol
              </Button>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <AddPolicyDependencyDialog
        chapterId={chapterId}
        open={open}
        onClose={handleCloseDialog}
        policyId={policyId}
        type={PolicyDependencyType.Protocol}
      />
    </Stack>
  );
};

export default ProtocolsList;
