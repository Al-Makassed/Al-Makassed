import React, { FC } from "react";
import { FieldsListProps } from "../types";
import { Button, Stack } from "@mui/material";
import FieldCard from "./FieldCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

const FieldsList: FC<FieldsListProps> = ({ fields }) => {
  return (
    <Stack gap={3}>
      {fields.map((field, index) => (
        <FieldCard key={index} field={field} />
      ))}
      <Button
        variant="contained"
        startIcon={<CheckCircleIcon />}
        sx={{ width: "fit-content", ml: "auto" }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default FieldsList;
