import { FC, useState } from "react";
import MTAddIcon from "@mui/icons-material/LibraryAdd";
import FieldAddIcon from "@mui/icons-material/PostAdd";
import { Grid, Typography } from "@mui/material";
import ActionsButtonGroup from "src/components/ActionsButtonGroup";
import { ActionsButtonGroupProps } from "src/components/ActionsButtonGroup/types";
import { selectIsManagerUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import AddFieldDialog from "./AddFieldDialog";

const PageHeader: FC = () => {
  const [isAddFieldDialogOpen, setIsAddFieldDialogOpen] = useState(false);

  const handelOpenAddFieldDialog = () => setIsAddFieldDialogOpen(true);

  const handleCloseAddFieldDialog = () => setIsAddFieldDialogOpen(false);

  // TODO: Move up options to a Context Provider
  const OPTIONS: ActionsButtonGroupProps["options"] = [
    {
      label: "Add Field",
      onClick: handelOpenAddFieldDialog,
      icon: <FieldAddIcon />,
    },
    {
      label: "Add Monitoring Tool",
      onClick: () => console.log("Add Monitoring Tool"),
      icon: <MTAddIcon />,
    },
  ];

  const { isTabletOrLess } = useMediaQuery();

  const isManager = useAppSelector(selectIsManagerUser);

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

      <AddFieldDialog
        onClose={handleCloseAddFieldDialog}
        open={isAddFieldDialogOpen}
      />
    </>
  );
};

export default PageHeader;
