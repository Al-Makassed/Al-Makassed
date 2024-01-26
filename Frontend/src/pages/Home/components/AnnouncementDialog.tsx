import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, ReactElement, Ref, forwardRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MaqasidDialog from "src/components/MaqasidDialog";
import { AnnouncementDialogProps } from "../types";

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
  const [value, setValue] = useState("");

  const handleCloseDialog = () => onClose();

  console.log(value);

  return (
    <MaqasidDialog
      isOpen={isOpen}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
      TransitionComponent={Transition}
      fullScreen={true}
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Post Announcement" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          style={{
            height: `calc(100vh - 64px - 32px - 41.5px - 52.5px - 30%)`,
          }}
        />
      </MaqasidDialog.Body>
      <MaqasidDialog.Footer>
        <LoadingButton
          // onClick={handleSubmit}
          type="submit"
          disabled={false}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          aria-label="Assign Departments"
          // loading={isPosting}
          loadingPosition="start"
        >
          Add
        </LoadingButton>
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default AnnouncementDialog;
