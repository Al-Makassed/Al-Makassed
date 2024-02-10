import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { FC, useEffect } from "react";
import TextField from "src/components/Fields/TextField";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddFieldForm from "./hooks/useAddFieldForm";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import { Category } from "./API/types";
import useGetCategories from "./hooks/useGetCategories";
import useMonitoringToolsContext from "../MonitoringTools/context/useMonitoringToolsContext";
import { MonitoringToolsDialog } from "../MonitoringTools/constants";

const AddFieldDialog: FC = () => {
  const { formikProps, isPending, status } = useAddFieldForm();

  const { dirty, isValid, resetForm, submitForm, setFieldValue } = formikProps;

  const { categories } = useGetCategories();

  const {
    state: { openedDialog },
    onCloseDialog,
  } = useMonitoringToolsContext();

  const handleCloseDialog = () => onCloseDialog();

  const handleSubmitForm = () => {
    submitForm();
  };

  useEffect(() => {
    if (!isPending && status === "success") {
      handleCloseDialog();
    }
  }, [isPending]);

  return (
    <FormikProvider value={formikProps}>
      <Form>
        <MaqasidDialog
          isOpen={openedDialog === MonitoringToolsDialog.AddField}
          onClose={handleCloseDialog}
          onClosed={() => resetForm()}
          disableBackdropClick={dirty}
          disableEscapeKeyDown={dirty}
        >
          <MaqasidDialog.Header>
            <MaqasidDialog.Title title="Add Field" />
            <MaqasidDialog.Actions>
              <MaqasidDialog.Fullscreen />
              <MaqasidDialog.Close />
            </MaqasidDialog.Actions>
          </MaqasidDialog.Header>
          <MaqasidDialog.Body>
            <FormikProvider value={formikProps}>
              <Stack py={2} justifyContent="center" gap={4}>
                <AutocompleteField
                  name="category"
                  label="Category"
                  id="category-autocomplete"
                  options={categories!}
                  getOptionLabel={(option) => (option as Category).name}
                  onChange={(event, value) => {
                    const categoryId = (value as Category).id;
                    setFieldValue("categoryId", categoryId);
                  }}
                />

                <TextField
                  name="content"
                  label="Field Content (Question)"
                  placeholder="e.g. Is the bracelet clear and available?"
                />
              </Stack>
            </FormikProvider>
          </MaqasidDialog.Body>
          <MaqasidDialog.Footer>
            <LoadingButton
              onClick={handleSubmitForm}
              type="submit"
              disabled={!dirty || !isValid}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              aria-label="Add Field"
              loading={isPending}
              loadingPosition="start"
            >
              Add
            </LoadingButton>
          </MaqasidDialog.Footer>
        </MaqasidDialog>
      </Form>
    </FormikProvider>
  );
};

export default AddFieldDialog;
