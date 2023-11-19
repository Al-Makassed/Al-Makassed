import React, { ChangeEvent, FC, useState } from "react";
import {
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LoadingButton } from "@mui/lab";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useUpdatePolicy from "../hooks/useUpdatePolicy";

const EditPolicyForm: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const id = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy } = useGetPolicy({ chapterId: id, policyId });

  const { updatePolicy, isUpdating } = useUpdatePolicy();

  const [mainFile, setMainFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMainFile(e.target.files[0]);
    }
  };

  const [estimatedTimeInMin, setEstimatedTimeInMin] = useState<number>(
    policy?.dependencies[0]?.estimatedTime ?? 0,
  );
  const handleChangePolicyTime = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const numericValue = parseInt(inputValue); // Parse the input value to a number

    setEstimatedTimeInMin(numericValue);
  };

  const [policyName, setPolicyName] = useState<string>(policy?.name ?? "");

  const [policyCode, setPolicyCode] = useState<string>(policy?.code ?? "");

  const [summary, setSummary] = useState<string>(policy?.summary ?? "");

  const handleChangePolicyCode = (event: ChangeEvent<HTMLInputElement>) => {
    setPolicyCode(event.target.value);
  };
  const handleChangePolicyName = (event: ChangeEvent<HTMLInputElement>) => {
    setPolicyName(event.target.value);
  };
  const handleChangeSummary = (event: ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  const handleSubmitChanges = () => {
    if (estimatedTimeInMin == null) return;
    const formData = new FormData();
    formData.set("Code", policyCode!);
    formData.set("MainFile", mainFile!);
    formData.set("Name", policyName);
    formData.set("EstimatedTimeInMin", estimatedTimeInMin?.toString());
    formData.set("Summary", summary);

    updatePolicy({ chapterId: id, policyId, formData: formData });
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} padding={6} width={500}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          Edit Policy
        </Typography>

        <TextField
          value={policyCode}
          color="success"
          label="Policy Code"
          variant="outlined"
          onChange={handleChangePolicyCode}
        />
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

        <TextField
          color="success"
          variant="standard"
          value={summary}
          onChange={handleChangeSummary}
        />
        <Typography>Main Policy File</Typography>
        <Stack direction="row" spacing={2}>
          <input type="file" onChange={handleChange} />

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

        <Typography>
          {mainFile ? `File name: ${mainFile.name}` : "no files uploaded yet"}
        </Typography>

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
