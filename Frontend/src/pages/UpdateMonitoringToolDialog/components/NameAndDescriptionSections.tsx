import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { FormikProvider } from "formik";
import { FC } from "react";
import TextField from "src/components/Fields/TextField";
import { MonitoringTool } from "../API/types";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useUpdateMonitoringToolForm from "../hooks/useUpdateMonitoringToolForm";
import SectionHeader from "./SectionHeader";

interface NameAndDescriptionSectionsProps {
  monitoringTool: MonitoringTool;
}

const NameAndDescriptionSections: FC<NameAndDescriptionSectionsProps> = ({
  monitoringTool,
}) => {
  const {
    state: { isEditingMode },
  } = useUpdateMonitoringToolContext();

  const { formikProps, isPending } =
    useUpdateMonitoringToolForm(monitoringTool);

  const { submitForm, dirty, isValid } = formikProps;

  const handleSubmitForm = () => submitForm();

  return (
    <FormikProvider value={formikProps}>
      <Stack gap={3}>
        {/* Name Section */}
        {isEditingMode && (
          <Stack gap={2}>
            <SectionHeader title="Name" />
            <TextField name="name" />
          </Stack>
        )}

        {/* Description Section */}
        <Stack gap={2}>
          <SectionHeader title="Description" />

          {isEditingMode && <TextField name="description" multiline />}

          {!isEditingMode && (
            <Typography variant="body1" paragraph>
              {monitoringTool.description}
            </Typography>
          )}
        </Stack>
      </Stack>

      {isEditingMode && (
        <LoadingButton
          onClick={handleSubmitForm}
          type="submit"
          disabled={!dirty || !isValid}
          variant="contained"
          color="primary"
          startIcon={<CheckCircleIcon />}
          aria-label="Add Field"
          loading={isPending}
          loadingPosition="start"
          sx={{ my: 2 }}
        >
          Submit Changes
        </LoadingButton>
      )}
    </FormikProvider>
  );
};

export default NameAndDescriptionSections;
