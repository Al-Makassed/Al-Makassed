import React, { FC } from "react";
import {
  Chip,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import useGetMonitoringTool from "./hooks/useGetMonitoringTool";
import UpdateIcon from "@mui/icons-material/Update";
import CreatedIcon from "@mui/icons-material/MoreTime";
import formatDate from "src/utils/formatDate";
import DescriptionSection from "./components/DescriptionSection";
import FieldsSection from "./components/FieldsSection";
import DepartmentsSection from "./components/DepartmentsSection";
import ViewerDialogSkeleton from "./components/ViewerDialogSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteMonitoringTool from "./hooks/useDeleteMonitoringTool";
// import useUpdateMonitoringToolForm from "./hooks/useUpdateMonitoringToolForm";
// import { FormikProvider } from "formik";
import HeaderTextField from "./components/HeaderTextField";
import SubmitButton from "./components/SubmitButton";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";

const MonitoringToolViewDialog: FC = () => {
  const [isEditingMode, setIsEditingMode] = React.useState(false);

  const {
    state: { selectedMonitoringTool, isMTViewDialogOpen },
    onCloseMTViewDialog,
  } = useMonitoringToolsContext();

  const monitoringToolId = selectedMonitoringTool?.id ?? "";

  const { monitoringTool, isFetching } = useGetMonitoringTool(monitoringToolId);

  const { removeMonitoringTool } = useDeleteMonitoringTool();

  const handleCloseDialog = () => {
    onCloseMTViewDialog();
    setIsEditingMode(false);
  };

  const handleSwitchChange = () => setIsEditingMode(!isEditingMode);

  const handleDeleteMonitoringTool = () =>
    removeMonitoringTool(monitoringToolId);

  const lastModified =
    monitoringTool?.lastModified && formatDate(monitoringTool.lastModified);

  const createdAt =
    monitoringTool?.createdAt && formatDate(monitoringTool.createdAt);

  //const { formikProps, isPending } = useUpdateMonitoringToolForm(monitoringTool!);

  return (
    <>
      <MaqasidDialog
        isOpen={isMTViewDialogOpen}
        onClose={handleCloseDialog}
        variant="right"
      >
        <MaqasidDialog.Header>
          {!isFetching &&
            (isEditingMode ? (
              <HeaderTextField
                monitoringTool={monitoringTool!}
                isEditingMode={isEditingMode}
              />
            ) : (
              <MaqasidDialog.Title flex={1} title={monitoringTool?.name} />
            ))}
          <MaqasidDialog.Actions>
            {/* <Chip label="View" /> */}
            <FormControlLabel
              sx={{ mr: 0, p: 1 }}
              control={<Switch onChange={handleSwitchChange} />}
              label="Edit"
            />
            {isEditingMode && (
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                sx={{ p: 0.5 }}
                onClick={handleDeleteMonitoringTool}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <MaqasidDialog.Fullscreen />
            <MaqasidDialog.Close />
          </MaqasidDialog.Actions>
        </MaqasidDialog.Header>
        <MaqasidDialog.Body>
          {isFetching ? (
            <ViewerDialogSkeleton />
          ) : (
            monitoringTool && (
              <Stack gap={2}>
                <Stack direction={{ sx: "column", md: "row" }} gap={1}>
                  <Chip
                    icon={<CreatedIcon />}
                    label={`Created at: ${createdAt}`}
                    variant="outlined"
                    sx={{ mb: 2, width: "fit-content" }}
                  />
                  <Chip
                    icon={<UpdateIcon />}
                    label={`Last Modified: ${lastModified}`}
                    variant="outlined"
                    sx={{ mb: 2, width: "fit-content" }}
                  />
                </Stack>

                {
                  <DescriptionSection
                    monitoringTool={monitoringTool}
                    isEditingMode={isEditingMode}
                  />
                }

                <FieldsSection fields={monitoringTool.fields} />

                <DepartmentsSection departments={monitoringTool.departments} />
              </Stack>
            )
          )}
        </MaqasidDialog.Body>
        {!isFetching && isEditingMode && (
          <MaqasidDialog.Footer>
            <SubmitButton
              monitoringTool={monitoringTool!}
              isEditingMode={isEditingMode}
            />
          </MaqasidDialog.Footer>
        )}
      </MaqasidDialog>
    </>
  );
};

export default MonitoringToolViewDialog;
