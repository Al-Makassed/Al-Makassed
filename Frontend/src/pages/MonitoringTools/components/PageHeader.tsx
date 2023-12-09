import MTAddIcon from "@mui/icons-material/LibraryAdd";
import FieldAddIcon from "@mui/icons-material/PostAdd";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import ActionsButtonGroup from "src/components/ActionsButtonGroup";
import { ActionsButtonGroupProps } from "src/components/ActionsButtonGroup/types";
import { selectIsManagerUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import useMonitoringToolsContext from "../context/useMonitoringToolsContext";
import AddFieldDialog from "./AddFieldDialog";

const PageHeader: FC = () => {
  const { onOpenAddFieldDialog } = useMonitoringToolsContext();

  const { isTabletOrLess } = useMediaQuery();

  const isManager = useAppSelector(selectIsManagerUser);

  const OPTIONS: ActionsButtonGroupProps["options"] = [
    {
      label: "Add Field",
      onClick: onOpenAddFieldDialog,
      icon: <FieldAddIcon />,
    },
    {
      label: "Add Monitoring Tool",
      onClick: () => console.log("Add Monitoring Tool"),
      icon: <MTAddIcon />,
    },
  ];

  return (
    <>
      <Grid container gap={1}>
        <Grid item>
          <Typography
            component="h1"
            variant={isTabletOrLess ? "h5" : "h4"}
            fontWeight={500}
          >
            Monitoring Tools
          </Typography>
        </Grid>

        <Grid item sx={{ ml: "auto" }}>
          {isManager && <ActionsButtonGroup options={OPTIONS} />}
        </Grid>
      </Grid>

      <AddFieldDialog />
    </>
  );
};

export default PageHeader;
