import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button, Stack } from "@mui/material";
import { FC, useState } from "react";
import { Dependency } from "src/API/types";
import { selectIsManagerUser } from "src/features/user";
import useGetPolicy from "src/pages/EditPolicyAndDependenciesDialog/hooks/useGetPolicy";
import AddPolicyDependencyDialog from "src/pages/PolicyDependencies/components/AddPolicyDependencyDialog";
import { useAppSelector } from "src/store/hooks";
import { POLICY_DEPENDENCIES_DISPLAY_NAMES } from "../constants";
import { DependenciesListProps } from "../types";

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
    <>
      <Stack gap={3} py={3} px={2}>
        <Stack>
          {policyDependencies.map((dependency: Dependency, index) => (
            <Stack direction="row" key={index} alignItems="center">
              <PictureAsPdfIcon color="error" />
              <Button
                href={dependency.pdfUrl}
                target="_blank"
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                }}
              >
                {dependency.name}
              </Button>
            </Stack>
          ))}
        </Stack>

        {isManager && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{ width: "fit-content", pr: 2.5 }}
            onClick={handleOpenDialog}
          >
            Add {dependencyName}
          </Button>
        )}
      </Stack>
      <AddPolicyDependencyDialog
        chapterId={chapterId}
        open={open}
        onClose={handleCloseDialog}
        policyId={policyId}
        type={type}
      />
    </>
  );
};

export default DependenciesList;
