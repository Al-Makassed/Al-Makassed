export interface EditChapterDialogProps {
  open: boolean;
  onClose: () => void;
  chapterId: string;
}
export interface EditChapterFormValues {
  newChapterName: string;
}
