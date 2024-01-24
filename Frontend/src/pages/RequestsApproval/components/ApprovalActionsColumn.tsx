// ApprovalActionsColumn.tsx
import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ApprovalRequest } from "../API/Types";

const ApprovalActionsColumn: React.FC<{
  row: ApprovalRequest;
  onApproval: (row: ApprovalRequest) => void;
  onDelete: (row: ApprovalRequest) => void;
  onView: (row: ApprovalRequest) => void;
}> = ({ row, onApproval, onDelete, onView }) => (
  <>
    <Tooltip title="Approve">
      <IconButton aria-label="Approve" onClick={() => onApproval(row)}>
        <CheckBoxIcon color="primary" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton aria-label="Delete" onClick={() => onDelete(row)}>
        <DisabledByDefaultIcon color="error" />
      </IconButton>
    </Tooltip>
    <Tooltip title="View">
      <IconButton aria-label="View" onClick={() => onView(row)}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  </>
);

export default ApprovalActionsColumn;
