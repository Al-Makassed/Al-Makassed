import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { HeaderProps } from "../../types";
import DescriptionSection from "./DescriptionSection";

const Header: FC<HeaderProps> = ({ focalPointTask }) => {
  const {
    totalSubmissions,
    monitoringTool: { name, description },
  } = focalPointTask;

  return (
    <Stack gap={3} width={"100%"}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
        <Typography component="h1" variant="h4">
          {name}
        </Typography>

        <Typography
          variant="body1"
          component={"div"}
          sx={{ ml: { sm: "auto" } }}
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          <Box color={"primary.main"}>{totalSubmissions}/14</Box>
          Submissions
        </Typography>
      </Stack>

      <DescriptionSection description={description} />
    </Stack>
  );
};

export default Header;
