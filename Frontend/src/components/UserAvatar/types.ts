import { AvatarProps } from "@mui/material/Avatar";

type UserAvatarContent =
  | {
      fullName: string;
      initials?: never;
    }
  | {
      fullName?: never;
      initials: string;
    };

export type UserAvatarProps = AvatarProps & UserAvatarContent;
