import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { EmptyBodyProps } from "./types";

const EmptyBody: FC<EmptyBodyProps> = ({
  message = "No records to display",
}) => {
  return (
    <TableBody>
      <Grid
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{message}</Typography>
      </Grid>
    </TableBody>
  );
};

export default EmptyBody;
