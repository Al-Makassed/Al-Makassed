import { Edit } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/CallTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { StyledIconButton, StyledTypography } from "../../styled";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import NotSetYet from "./NotSetYet";

const ContactingPart: FC = () => {
  const { email, phoneNumber } = useAppSelector(selectUser);

  const handleEditClick = () => {};

  return (
    <Stack>
      <Box borderBottom="1px solid lightGray">
        <Typography variant="h6">Contacting Details</Typography>
      </Box>

      <Stack gap={2} p={{ sm: 2 }}>
        {/* Email Section */}
        <Stack direction="row" alignItems="center" gap={1}>
          <EmailIcon sx={{ color: "grey" }} />:
          <StyledTypography>{email}</StyledTypography>
          <StyledIconButton
            sx={{
              "&:hover": {
                bgcolor: (theme) => theme.palette.grey[200],
              },
            }}
          >
            <Edit sx={{ fontSize: "1.25rem" }} />
          </StyledIconButton>
        </Stack>

        {/* Phone Number Section */}
        <Stack direction="row" alignItems="center" gap={1}>
          <PhoneIcon sx={{ color: "grey" }} />:{!phoneNumber && <NotSetYet />}
          {phoneNumber && <StyledTypography>{phoneNumber}</StyledTypography>}
          <StyledIconButton
            sx={{
              "&:hover": {
                bgcolor: (theme) => theme.palette.grey[200],
              },
            }}
            onClick={handleEditClick}
          >
            <Edit sx={{ fontSize: "1.25rem" }} />
          </StyledIconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactingPart;
