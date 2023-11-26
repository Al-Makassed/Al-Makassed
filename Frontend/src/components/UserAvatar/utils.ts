import { USER_AVATAR_PALETTE } from "src/style/palettes";
import stringToColor from "src/utils/stringToColor";

export const getAvatarColor = (label: string) =>
  stringToColor(label, Object.values(USER_AVATAR_PALETTE));
