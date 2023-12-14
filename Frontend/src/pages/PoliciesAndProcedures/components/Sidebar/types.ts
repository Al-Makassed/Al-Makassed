import { Dispatch, SetStateAction } from "react";
import { Chapter } from "./API/types";

export interface ArrowIconProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ChapterListItemProps {
  chapter: Chapter;
}

export interface AddChapterDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface AddChapterProps {
  chapterName: string;
}
