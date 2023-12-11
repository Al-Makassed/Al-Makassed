import React, { FC, useState } from "react";
import { PolicyDependencyType } from "../constants";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PolicyDependenciesProps } from "../types";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import AddPolicyDependencyDialog from "./AddPolicyDependencyDialog";
import useGetPolicy from "src/pages/EditPolicyAndDependenciesDialog/hooks/useGetPolicy";
import { Dependency } from "src/pages/EditPolicyAndDependenciesDialog/API/types";

const FormsList: FC<PolicyDependenciesProps> = ({ chapterId, policyId }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const { policy } = useGetPolicy({ chapterId, policyId });

  const policyForms =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Form,
    ) ?? [];

  return (
    <Stack>
      <Accordion
        sx={{
          bgcolor: "grey.200",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Form</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={3}>
            <Stack>
              {policyForms.map((policyForm: Dependency, index) => (
                <Stack direction="row" key={index}>
                  <FileOpenIcon sx={{ ml: 1 }} />
                  <Button
                    href={policyForm.pdfUrl}
                    target="_blank"
                    sx={{ color: "black" }}
                  >
                    {policyForm.name}
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
                Add Form
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
        type={PolicyDependencyType.Form}
      />
    </Stack>
  );
};

export default FormsList;
