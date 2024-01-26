export interface HomeProps {
  userName?: string;
}

export interface AnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
