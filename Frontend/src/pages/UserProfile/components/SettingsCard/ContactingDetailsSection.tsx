import { Edit } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/CallTwoTone";
import EmailIcon from "@mui/icons-material/EmailTwoTone";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import RoleIcon from "@mui/icons-material/ManageAccountsTwoTone";

export interface ContactingDetailsSectionProps {
  // email: string;
  // phoneNumber: string;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: 12,
  padding: theme.spacing(0.3, 1.5),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    bgcolor: theme.palette.grey[500],
  },
}));

const ContactingDetailsSection: FC<ContactingDetailsSectionProps> = () => {
  const { email, phoneNumber, roles } = useAppSelector(selectUser);

  const onEditClick = () => {};

  return (
    <Stack gap={2} sx={{ transition: "all 0.3s ease" }}>
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
            <PhoneIcon sx={{ color: "grey" }} />:
            <StyledTypography>{phoneNumber}</StyledTypography>
            <StyledIconButton
              sx={{
                "&:hover": {
                  bgcolor: (theme) => theme.palette.grey[200],
                },
              }}
              onClick={onEditClick}
            >
              <Edit sx={{ fontSize: "1.25rem" }} />
            </StyledIconButton>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Box borderBottom="1px solid lightGray">
          <Typography variant="h6">Department Details</Typography>
        </Box>

        <Stack gap={2} p={2}>
          <Stack direction="row" gap={1} alignItems="center">
            <Stack direction="row" gap={0.3}>
              <RoleIcon sx={{ color: "grey" }} />
              <Typography fontWeight="500">Role:</Typography>
            </Stack>

            <StyledTypography>{roles[0]}</StyledTypography>
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
            <Stack direction="row" gap={0.3}>
              <RoleIcon sx={{ color: "grey" }} />
              <Typography fontWeight="500">Role:</Typography>
            </Stack>

            <StyledTypography>{roles[0]}</StyledTypography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactingDetailsSection;
