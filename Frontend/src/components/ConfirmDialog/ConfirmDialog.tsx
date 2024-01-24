import { FC } from "react";
import MaqasidDialog from "../MaqasidDialog";
import { ConfirmDialogProps } from "./types";
import Button from "@mui/material/Button";

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  subtitle,
  body,
  onClose,
  actions,
  ...rest
}) => {
  return (
    <MaqasidDialog isOpen={isOpen} onClose={onClose} {...rest} maxWidth="xs">
      <MaqasidDialog.Header>
        <MaqasidDialog.Title flex={1} title={title} subtitle={subtitle} />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body>{body}</MaqasidDialog.Body>
      <MaqasidDialog.Footer>
        {actions?.map((action) => (
          <Button key={action.text} {...action}>
            {action.text}
          </Button>
        ))}
      </MaqasidDialog.Footer>
    </MaqasidDialog>
  );
};

export default ConfirmDialog;
