import {
  Stack,
  Box,
  Typography,
  Tooltip,
  IconButton,
  List,
  ListItemIcon,
  TextField,
  InputAdornment,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Dependency } from "../API/types";
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import { useParams } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EditPoster = () => {
  const { code } = useParams();
  const {
    policy,
    // isFetching
  } = useGetPolicyByCode(code ?? "");

  const [posterName, setPosterName] = useState<string | undefined>("");

  const handleChangePosterName = (event: ChangeEvent<HTMLInputElement>) => {
    setPosterName(event.target.value);
  };
  const [estimatedTimeInMin, setEstimatedTimeInMin] = useState<number>();

  const handleChangePolicyTime = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const numericValue = parseInt(inputValue); // Parse the input value to a number

    setEstimatedTimeInMin(numericValue);
  };
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
          Posters information
        </Typography>
        <Tooltip title="Delete All">
          <IconButton
            color="error"
            aria-label="Delete All"
            sx={{ mr: 2 }}

            // onClick={handleDeleteAllPolicies}
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
            {dependency.policyDependencyType === 1 && (
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

export default EditPoster;
