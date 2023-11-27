import MTAddIcon from "@mui/icons-material/LibraryAdd";
import FieldAddIcon from "@mui/icons-material/PostAdd";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import ActionsButtonGroup from "src/components/ActionsButtonGroup";
import { ActionsButtonGroupProps } from "src/components/ActionsButtonGroup/types";
import { selectIsAdminUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";

// TODO: Move up options to a Context Provider
const OPTIONS: ActionsButtonGroupProps["options"] = [
  {
    label: "Add Field",
    onClick: () => console.log("Add Field"),
    icon: <FieldAddIcon />,
  },
  {
    label: "Add Monitoring Tool",
    onClick: () => console.log("Add Monitoring Tool"),
    icon: <MTAddIcon />,
  },
];

const PageHeader: FC = () => {
  const { isTabletOrLess } = useMediaQuery();

  const isAdmin = useAppSelector(selectIsAdminUser);

  return (
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
        {isAdmin && <ActionsButtonGroup options={OPTIONS} />}
      </Grid>
    </Grid>
  );
};

export default PageHeader;
