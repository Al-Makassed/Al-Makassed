import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { DrawerHeader } from "../styled";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/material";
import useSidebarContext from "src/pages/PoliciesAndProcedures/context/useSidebar";

const Title: FC = () => {
  const { closeSidebar } = useSidebarContext();

  return (
    <DrawerHeader>
      <Typography variant="h6" fontWeight={500} sx={{ pt: 2 }} noWrap>
        Policies & Procedures
      </Typography>
      <Tooltip title="Close Sidebar">
        <IconButton onClick={closeSidebar}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </DrawerHeader>
  );
};

export default Title;
