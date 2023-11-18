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
import useGetPolicyByCode from "../hooks/useGetPolicyBYCode";
import EditChapterFormSkeleton from "src/pages/EditChapterForm/components/EditChapterFormSkeleton";
import useUpdatePolicy from "../hooks/useUpdatePolicy";

const PoliciesList: FC = () => {
  const { code } = useParams();

  const { policy, isFetching } = useGetPolicyByCode(code ?? "");

  const { updatePolicy, isUpdating } = useUpdatePolicy();

  const [mainFile, setMainFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMainFile(e.target.files[0]);
    }
  };

  const [policyName, setPolicyName] = useState<string>(policy?.name ?? "");
  const [summary, setSummary] = useState<string>(policy?.summary ?? "");

  const [estimatedTimeInMin, setEstimatedTimeInMin] = useState<number>(
    policy?.dependencies[0]?.estimatedTime ?? 0,
  );

  const handleChangePolicyName = (event: ChangeEvent<HTMLInputElement>) => {
    setPolicyName(event.target.value);
  };
  const handleChangeSummary = (event: ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };
  const handleChangePolicyTime = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = parseInt(inputValue); // Parse the input value to a number
    setEstimatedTimeInMin(numericValue);
  };

  const handleSubmitChanges = () => {
    if (estimatedTimeInMin == null) return;
    const formData = new FormData();
    formData.set("MainFile", mainFile!);
    formData.set("Name", policyName);
    formData.set("EstimatedTimeInMin", estimatedTimeInMin?.toString());
    formData.set("Summary", summary);

    updatePolicy({ code: code!, formData: formData });
  };

  if (isFetching) return <EditChapterFormSkeleton />;

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

export default PoliciesList;
