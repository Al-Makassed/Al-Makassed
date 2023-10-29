import Dependency from "./Dependency";
import { Stack } from "@mui/material";
import React, { FC } from "react";
import { NAMES } from "../constants";

const Dependencies: FC = () => {
  return (
    <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
      {NAMES.map((e, index) => (
        <Dependency key={index} name={e.name} />
      ))}
    </Stack>
  );
};

export default Dependencies;
