import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, { FC } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { isProduction } from "src/utils";
import { ContainerStack, ErrorDetail, ErrorTypography } from "./styled";
import { UnexpectedErrorProps } from "./types";

const UnexpectedError: FC<UnexpectedErrorProps> = ({
  error = {},
  resetErrorBoundary,
}) => {
  if (isProduction)
    return (
      <ContainerStack gap={2} isProduction>
        <ErrorTypography variant="h4">
          <ErrorOutlineIcon fontSize={"large"} sx={{ m: 10 }} /> Unexpected
          Error
        </ErrorTypography>
        <Button
          onClick={resetErrorBoundary}
          variant="contained"
          color="warning"
        >
          Try again
        </Button>
      </ContainerStack>
    );

  return (
    <ContainerStack gap={2} role="alert">
      <Typography variant="h4" fontWeight={500}>
        Unexpected Error: {error?.message ?? JSON.stringify(error)}
      </Typography>
      <ErrorDetail isErrorMessage>{error?.message}</ErrorDetail>
      <ErrorDetail isErrorStack>{error?.stack}</ErrorDetail>
      <Stack direction="row" sx={{ justifyContent: "center" }}>
        <Button
          onClick={resetErrorBoundary}
          fullWidth={false}
          variant="contained"
          color="warning"
        >
          Try again
        </Button>
      </Stack>
    </ContainerStack>
  );
};

export default UnexpectedError;
