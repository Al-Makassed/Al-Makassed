import { FC } from "react";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import { StyledAvatar } from "./styled";
import { UserAvatarProps } from "./types";
import { getAvatarColor } from "./utils";

const UserAvatar: FC<UserAvatarProps> = ({ fullName, initials, ...props }) => {
  const avatarAbbreviation = initials
    ? initials.toUpperCase().slice(0, 2)
    : getAvatarAbbreviation(fullName);

  const avatarColor = getAvatarColor(avatarAbbreviation);

  return (
    <StyledAvatar sx={{ bgcolor: avatarColor }} {...props}>
      {avatarAbbreviation}
    </StyledAvatar>
  );
};

export default UserAvatar;
