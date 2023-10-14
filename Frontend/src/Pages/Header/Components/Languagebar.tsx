import React from "react";
import { Stack, Typography, Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { names } from "../constants";

const LanguageBar = () => {
  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      sx={{ bgcolor: (theme) => theme.palette.maqasid.primary }}
    >
      <Typography color="white" variant="subtitle1" my={1.5}>
        Language
      </Typography>
      <Box>
        <TextField
          id="lan"
          select
          label=""
          defaultValue="English"
          size="small"
          sx={{ width: "100px", p: 1 }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
};

export default LanguageBar;
