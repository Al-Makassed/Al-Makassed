import { Dispatch, SetStateAction } from "react";

export interface Chapter {
  id: string;
  name: string;
  enableState: boolean;
  policies: Policy[];
}

export interface Policy {
  code: string;
  name: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  dependencies: Dependency[];
}

export interface Dependency {
  code: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
}

export interface ArrowIconProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ChapterListItemProps {
  chapter: Chapter;
}

export interface ChapterProps {
  chapter: Chapter[];
  setChapter: React.Dispatch<React.SetStateAction<Chapter[]>>;
}

export interface AddChapterDialogProps {
  open: boolean;
  onClose: () => void;
}
