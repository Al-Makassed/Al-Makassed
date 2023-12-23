import { Button, List, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddDepartmentDialog from "./AddDepartmentDialog";
import AddIcon from "@mui/icons-material/Add";
import useGetDepartments from "../hooks/useGetDepartments";
import { Department } from "../API/type";
import DepartmentListItem from "./DepartmentListItem";

const DepartmentDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { departments } = useGetDepartments();
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <Stack gap={1.5}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleOpenDialog}
        sx={{ width: "fit-content" }}
      >
        Department
      </Button>
      <AddDepartmentDialog open={isDialogOpen} onClose={handleCloseDialog} />
      <Typography variant="h6" fontWeight={500}>
        All departments
      </Typography>
      <Paper
        elevation={5}
        sx={{ borderRadius: 3, bgcolor: (theme) => theme.palette.grey[100] }}
      >
        <List
          sx={{
            width: "100%",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {departments?.map((department: Department, index) => (
            <DepartmentListItem key={index} department={department} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default DepartmentDetails;
