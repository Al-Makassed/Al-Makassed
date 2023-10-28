import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { DrawerHeader } from "../styled";

const Title: FC = () => {
  return (
    <DrawerHeader>
      <Typography
        variant="h6"
        fontWeight={500}
        sx={{ pt: 2 }}
        // fontSize="1.3em"
        noWrap
      >
        Policies & Procedures
      </Typography>
    </DrawerHeader>
  );
};

export default Title;
