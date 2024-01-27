export type NotificationType = "info" | "warning" | "anniversary";

export interface NotificationItemProps {
  type: NotificationType;
  content: {
    primary: string;
    secondary?: string;
    time: string;
  };
}
