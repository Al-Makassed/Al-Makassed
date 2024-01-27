import Stack from "@mui/material/Stack";
import {
  CreateDataGridConfigWithDefaults,
  DataGridContainerProps,
} from "./types";

export function makeDataGridContainer<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>,
) {
  const DataGridContainer = (props: DataGridContainerProps) => {
    const { children } = props;

    return (
      <Stack sx={{ height: "100%", position: "relative" }}>{children}</Stack>
    );
  };

  DataGridContainer.displayName = `${configs.name}Body`;

  return DataGridContainer;
}
