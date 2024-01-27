import { Announcement } from "./API/types";

export interface HomeProps {
  userName?: string;
}

export interface AnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AnnouncementCardProps {
  announcement: Announcement;
}
