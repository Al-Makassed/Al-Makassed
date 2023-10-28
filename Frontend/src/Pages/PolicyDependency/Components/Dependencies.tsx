import Dependency from "./Dependency";
import { Stack } from "@mui/material";
import React from "react";
import { names } from "../Constants";

const Dependencies = () => {
  return (
    <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
      {names.map((e, index) => (
        <Dependency key={index} name={e.name} />
      ))}
    </Stack>
  );
};

export default Dependencies;
