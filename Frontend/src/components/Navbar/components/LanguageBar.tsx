import React from "react";
import { Stack, Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { names } from "../constants";

const LanguageBar = () => {
  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      // sx={{ bgcolor: (theme) => theme.palette.maqasid.primary }}
    >
      <Box>
        <TextField
          id="language-select"
          select
          label=""
          defaultValue="English"
          size="small"
          sx={{
            width: "100px",
            p: 1,
            "& .MuiInputBase-root": {
              color: (theme) => theme.palette.grey[50],
            },
          }}
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
