import React, { ChangeEvent, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dependency } from "../API/types";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EditForm = () => {
  const { code } = useParams();
  const {
    policy,
    // isFetching
  } = useGetPolicyByCode(code ?? "");

//   const [formName, setFormName] = useState<string | undefined>("");

//   const handleChangeFormName = (event: ChangeEvent<HTMLInputElement>) => {
//     setFormName(event.target.value);
//   };
//   const [estimatedTimeInMin, setEstimatedTimeInMin] = useState<number>();

//   const handleChangePolicyTime = (event: ChangeEvent<HTMLInputElement>) => {
//     const inputValue = event.target.value;

//     const numericValue = parseInt(inputValue); // Parse the input value to a number

//     setEstimatedTimeInMin(numericValue);
//   };
  if (!policy) return <Typography variant="h1">Invalid Policy Code</Typography>;

  return (
    <Stack>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ justifyContent: "space-between", mt: 2, pl: 1 }}
      >
        <Typography
          variant="subtitle1"
          fontFamily="serif"
          fontWeight={500}
          fontSize={20}
        >
          Forms information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton
            color="error"
            aria-label="Delete All"
            // onClick={handleDeleteAllPolicies}
            sx={{ mr: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List
        sx={{
          border: (theme) => `1px dashed ${theme.palette.success.main}`,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
        disablePadding
      >
        {policy.dependencies.map((dependency: Dependency, index) => (
          <React.Fragment key={index}>
            {dependency.policyDependencyType === 0 && (
              <ListItem sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "#d32f2f" }}>
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary={dependency.name} sx={{ ml: -2 }} />

                
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="Delete Policy"
                    // onClick={() => deletePolicy(policy.code)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default EditForm;
