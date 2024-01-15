import RoleIcon from "@mui/icons-material/ManageAccountsTwoTone";
import { Box, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import UserAvatar from "src/components/UserAvatar";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import { StyledTypography } from "../../styled";
import { DepartmentPartProps } from "../../types";
import NotSetYet from "./NotSetYet";

const DepartmentPart: FC<DepartmentPartProps> = ({ head }) => {
  const { roles } = useAppSelector(selectUser);

  return (
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
          <Typography fontWeight="500">Focal Point:</Typography>
          {head && (
            <>
              <UserAvatar src={head.avatarUrl} initials={head.userName[0]} />

              <Stack direction="row" alignItems="center" gap={1.5}>
                <Typography>{head.fullName}</Typography>
                <Link href={`mailto:${head.email}`} color="primary">
                  contact
                </Link>
              </Stack>
            </>
          )}
          {!head && <NotSetYet />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DepartmentPart;
