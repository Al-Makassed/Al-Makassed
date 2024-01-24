import { Avatar, Card, Stack } from "@mui/material";
import { FC } from "react";
import { selectUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import { formatDate } from "src/utils";
import DetailsSection from "./PersonalInfoSection";
import NamesSection from "./NamesSection";
import { InformationCardProps } from "../../types";

const InformationCard: FC<InformationCardProps> = ({ user }) => {
  const { userId, avatarUrl, fullName, userName } = useAppSelector(selectUser);

  const {
    department: { name: departmentName },
    createdOn,
  } = user;

  const createdAtDate = formatDate(createdOn);

  const { isMobile } = useMediaQuery();

  return (
    <Card sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
      {!isMobile && (
        <Stack direction="row" alignItems="center">
          <Avatar
            src={avatarUrl}
            sx={{
              width: 140,
              height: 140,
            }}
          />

          <Stack gap={1.35} ml={{ xs: 2, sm: 4 }}>
            <NamesSection fullName={fullName} userName={userName} />

            <DetailsSection
              userId={userId}
              departmentName={departmentName}
              createdAtDate={createdAtDate}
            />
          </Stack>
        </Stack>
      )}

      {isMobile && (
        <Stack alignItems="center" gap={2}>
          <Stack alignItems="center">
            <Avatar
              src={avatarUrl}
              sx={{
                width: 140,
                height: 140,
                mb: 1,
              }}
            />

            <NamesSection fullName={fullName} userName={userName} />
          </Stack>

          <DetailsSection
            userId={userId}
            departmentName={departmentName}
            createdAtDate={createdAtDate}
          />
        </Stack>
      )}
    </Card>
  );
};

export default InformationCard;
