import { Check, Edit } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/CallTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { FormikProvider } from "formik";
import { FC, useState } from "react";
import TextField from "src/components/Fields/TextField";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import { EditType } from "../../constants";
import usePatchUserForm from "../../hooks/usePatchUserForm";
import { StyledIconButton, StyledTypography } from "../../styled";
import NotSetYet from "./NotSetYet";

const ContactingPart: FC = () => {
  const [isEditing, setIsEditing] = useState<EditType | undefined>(undefined);

  const { email, phoneNumber } = useAppSelector(selectUser);

  const { formikProps, isUpdating } = usePatchUserForm(email, phoneNumber);

  const { dirty, isValid, submitForm, resetForm } = formikProps;

  const handlePhoneNoEditClick = () => {
    if (isEditing === EditType.Email) resetForm();

    setIsEditing(EditType.PhoneNumber);
  };

  const handleEmailEditClick = () => {
    if (isEditing === EditType.PhoneNumber) resetForm();

    setIsEditing(EditType.Email);
  };

  const handleSubmit = () => {
    submitForm();
    setIsEditing(undefined);
  };

  return (
    <Stack>
      <Box borderBottom="1px solid lightGray">
        <Typography variant="h6">Contacting Details</Typography>
      </Box>

      <FormikProvider value={formikProps}>
        <Stack gap={2} p={{ sm: 2 }}>
          {/* Email Section */}
          <Stack direction="row" alignItems="center" gap={1}>
            <EmailIcon sx={{ color: "grey" }} />:
            {isEditing !== EditType.PhoneNumber && (
              <>
                <StyledTypography>{email}</StyledTypography>

                <StyledIconButton onClick={handlePhoneNoEditClick}>
                  <Edit sx={{ fontSize: "1.25rem" }} />
                </StyledIconButton>
              </>
            )}
            {isEditing === EditType.PhoneNumber && (
              <>
                <TextField
                  name={"email"}
                  sx={{
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                      p: 1,
                    },
                  }}
                />

                <LoadingButton
                  loading={isUpdating}
                  disabled={!dirty || !isValid}
                  onClick={handleSubmit}
                  sx={{ borderRadius: 12 }}
                >
                  <Check sx={{ fontWeight: "1.25rem" }} />
                </LoadingButton>
              </>
            )}
          </Stack>

          {/* Phone Number Section */}
          <Stack direction="row" alignItems="center" gap={1}>
            <PhoneIcon sx={{ color: "grey" }} />:
            {!phoneNumber && isEditing !== EditType.Email && <NotSetYet />}
            {phoneNumber && isEditing !== EditType.Email && (
              <StyledTypography>{phoneNumber}</StyledTypography>
            )}
            {isEditing !== EditType.Email && (
              <StyledIconButton onClick={handleEmailEditClick}>
                <Edit sx={{ fontSize: "1.25rem" }} />
              </StyledIconButton>
            )}
            {isEditing === EditType.Email && (
              <>
                <TextField
                  name={"phoneNumber"}
                  sx={{
                    width: "fit-content",
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                      p: 1,
                    },
                  }}
                />

                <LoadingButton
                  loading={isUpdating}
                  disabled={!dirty || !isValid}
                  onClick={handleSubmit}
                  sx={{ borderRadius: 12 }}
                >
                  <Check sx={{ fontWeight: "1.25rem" }} />
                </LoadingButton>
              </>
            )}
          </Stack>
        </Stack>
      </FormikProvider>
    </Stack>
  );
};

export default ContactingPart;
