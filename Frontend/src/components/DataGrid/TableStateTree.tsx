import { FC, useContext } from "react";
import { CreateDataGridConfigWithDefaults } from "src/components/DataGrid/types";

/**
 * This is for debugging purposes only. It will display the entire state tree of the table.
 * @param configs
 */
export function makeTableStateTree<T extends object>(
  configs: CreateDataGridConfigWithDefaults<T>,
) {
  const TableStateTree: FC = () => {
    const { table } = useContext(configs.Context);

    const { getAllColumns } = table;

    return <pre>{JSON.stringify(getAllColumns(), null, 2)}</pre>;
  };

  TableStateTree.displayName = `${configs.name}.TableStateTree`;
  return TableStateTree;
}
