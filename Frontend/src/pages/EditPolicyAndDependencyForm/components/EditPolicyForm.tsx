import React, { ChangeEvent, FC, useState } from "react";
import {
  Grid,
  // Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
// import { useTheme } from "@mui/material/styles";
import SummarizeIcon from "@mui/icons-material/Summarize";
// import { FileUploader } from "react-drag-drop-files";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useParams } from "react-router-dom";
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import EditChapterFormSkeleton from "src/pages/EditChapterForm/components/EditChapterFormSkeleton";
import useUpdatePolicy from "../hooks/useUpdatePolicy";

// const ALLOWED_FILE_EXTENSIONS = ["pdf"];

const EditPolicyForm: FC = () => {
  const { code } = useParams();

  const { policy, isFetching } = useGetPolicyByCode(code ?? "");

  const { updatePolicy, isUpdating } = useUpdatePolicy();

  const [mainFile, setMainFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMainFile(e.target.files[0]);
      // console.log(e.target.files[0].name);
    }
  };

  const [policyName, setPolicyName] = useState<string>(policy?.name ?? "");
  const [estimatedTimeInMin, setEstimatedTimeInMin] = useState<number>(
    policy?.dependencies[0]?.estimatedTime ?? 0,
  );

  const handleChangePolicyName = (event: ChangeEvent<HTMLInputElement>) => {
    setPolicyName(event.target.value);
  };

  const handleChangePolicyTime = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue); // Parse the input value to a number
    setEstimatedTimeInMin(numericValue);
  };
  const theme = useTheme();

  const handleSubmitChanges = () => {
    if (estimatedTimeInMin == null) return;
    const formData = new FormData();
    formData.set("MainFile", mainFile!);
    formData.set("Name", policyName);
    formData.set("EstimatedTimeInMin", estimatedTimeInMin?.toString());
    updatePolicy({ code: code!, formData: formData });
  };

  if (isFetching) return <EditChapterFormSkeleton />;

  return (
    <Grid
      container
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        overflow: "auto",
        ...theme.mixins.niceScroll(),
      }}
    >
      <Stack spacing={3} padding={6} width={500}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          Edit Policy
        </Typography>
        <TextField
          value={policyName}
          color="success"
          label="Policy Name"
          variant="outlined"
          onChange={handleChangePolicyName}
        />

        <Stack direction="row" spacing={1}>
          <SummarizeIcon fontSize="small" />
          <Typography>Policy Summary</Typography>
        </Stack>

        <TextField color="success" variant="standard" />
        <Typography>Main Policy File</Typography>
        <Stack direction="row" spacing={2}>
          <input type="file" onChange={handleChange} />
          {/* <FileUploader
        type="file"
        handleChange={handleChange}
        name="files"
        types={ALLOWED_FILE_EXTENSIONS}
        label="Upload or drop a file right here"
      /> */}
          <TextField
            value={estimatedTimeInMin}
            onChange={handleChangePolicyTime}
            type="number"
            color="success"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessAlarmsIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Stack>

        {/* <Typography>
          {mainFile ? `File name: ${mainFile.name}` : "no files uploaded yet"}
        </Typography> */}

        <LoadingButton
          loading={isUpdating}
          loadingPosition="start"
          size="medium"
          color="success"
          type="submit"
          variant="contained"
          onClick={handleSubmitChanges}
          endIcon={<DriveFileRenameOutlineIcon />}
          disabled={policyName === ""}
        >
          Update
        </LoadingButton>
      </Stack>
    </Grid>
  );
};

export default EditPolicyForm;
