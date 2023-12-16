import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Dependency } from "src/API/types";
import useGetPolicy from "src/pages/EditPolicyAndDependenciesDialog/hooks/useGetPolicy";
import { POLICY_DEPENDENCIES_DISPLAY_NAMES } from "../constants";
import { DependenciesListProps } from "../types";
import AddPolicyDependencyDialog from "./AddPolicyDependencyDialog";
import { useAppSelector } from "src/store/hooks";
import { selectIsManagerUser } from "src/features/user";

const DependenciesList: FC<DependenciesListProps> = ({
  chapterId,
  policyId,
  type,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const { policy } = useGetPolicy({ chapterId, policyId });

  const policyDependencies =
    policy?.dependencies.filter((dependency) => dependency.type === type) ?? [];

  const dependencyName = POLICY_DEPENDENCIES_DISPLAY_NAMES.get(type) ?? "";

  const isManager = useAppSelector(selectIsManagerUser);

  return (
    <Stack>
      <Accordion
        sx={{
          bgcolor: "grey.200",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{dependencyName}s</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={3}>
            <Stack>
              {policyDependencies.map((dependency: Dependency, index) => (
                <Stack direction="row" key={index}>
                  <FileOpenIcon sx={{ ml: 1 }} />
                  <Button
                    href={dependency.pdfUrl}
                    target="_blank"
                    sx={{ color: "black" }}
                  >
                    {dependency.name}
                  </Button>
                </Stack>
              ))}
            </Stack>

            {isManager && (
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
                  Add {dependencyName}
                </Button>
              </Stack>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <AddPolicyDependencyDialog
        chapterId={chapterId}
        open={open}
        onClose={handleCloseDialog}
        policyId={policyId}
        type={type}
      />
    </Stack>
  );
};

export default DependenciesList;
