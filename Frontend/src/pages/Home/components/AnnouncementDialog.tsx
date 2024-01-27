import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
  FormControlLabel,
  Slide,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FormikProvider } from "formik";
import { FC, ReactElement, Ref, forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MaqasidDialog from "src/components/MaqasidDialog";
import useAddAnnouncementForm from "../hooks/useAddAnnouncementForm";
import { AnnouncementDialogProps } from "../types";
import { teal } from "@mui/material/colors";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AnnouncementDialog: FC<AnnouncementDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { formikProps, isPosting } = useAddAnnouncementForm();

  const { submitForm, dirty, isValid, setFieldValue } = formikProps;

  const handleSubmit = () => {
    submitForm();
    onClose();
  };

  const handleCloseDialog = () => onClose();

  return (
    <MaqasidDialog
      isOpen={isOpen}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
      TransitionComponent={Transition}
      fullScreen={true}
    >
      <MaqasidDialog.Header bgColor={teal[400]}>
        <Stack direction="row" alignItems="center" gap={0.75}>
          <CampaignRoundedIcon
            sx={{ color: (theme) => theme.palette.grey[50], mb: 0.2 }}
          />
          <MaqasidDialog.Title
            title="Post an Announcement"
            color={(theme) => theme.palette.grey[50]}
          />
        </Stack>

        <MaqasidDialog.Actions color={(theme) => theme.palette.grey[50]}>
          <MaqasidDialog.Close color="inherit" />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      <MaqasidDialog.Body>
        <FormikProvider value={formikProps}>
          <Stack gap={0.5}>
            <Stack direction="row" alignItems="center">
              <Typography
                color="GrayText"
                fontSize="1.1rem"
                sx={{ fontStyle: "italic" }}
              >
                What do you want to share?
              </Typography>
              <FormControlLabel
                sx={{ ml: "auto", p: 1 }}
                control={
                  <Switch
                    onChange={(event, value) =>
                      setFieldValue("isPinned", value)
                    }
                  />
                }
                label="Pin?"
              />
            </Stack>

            <ReactQuill
              theme="snow"
              value={formikProps.values.body}
              onChange={(content) => setFieldValue("body", content)}
              style={{
                height: `calc(100vh - 64px - 32px - 41.5px - 52.5px - 54px - 30vh)`,
                borderRadius: 1,
              }}
            />
          </Stack>
        </FormikProvider>
      </MaqasidDialog.Body>
      <MaqasidDialog.Footer>
        <LoadingButton
          onClick={handleSubmit}
          type="submit"
          disabled={!dirty || !isValid}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          aria-label="Assign Departments"
          loading={isPosting}
          loadingPosition="start"
        >
          Post
        </LoadingButton>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default AnnouncementDialog;
