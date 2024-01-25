import PROGRESS_BAR_PALETTE from "src/style/palettes/progressBar";
import stringToColor from "src/utils/stringToColor";

export const getColor = (label: string) =>
  stringToColor(label, Object.values(PROGRESS_BAR_PALETTE));

export const round = (number: number): number => {
  return parseFloat(number.toFixed(2));
};
