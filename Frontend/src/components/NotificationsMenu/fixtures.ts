import { WithId } from "src/types";
import { NotificationItemProps } from "./types";

export const NOTIFICATIONS: WithId<NotificationItemProps>[] = [
  {
    id: "1",
    type: "info",
    content: {
      primary: "Your order has been shipped!",
      secondary: "2 days ago",
      time: "3:00 AM",
    },
  },
  {
    id: "2",
    type: "warning",
    content: {
      primary: "A new update is available!",
      secondary: "3 days ago",
      time: "5:50 PM",
    },
  },
  {
    id: "3",
    type: "anniversary",
    content: {
      primary: "Happy Birthday!",
      secondary: "4 days ago",
      time: "3:00 AM",
    },
  },
  {
    id: "4",
    type: "warning",
    content: {
      primary: "A monitoring tool is waiting for you!",
      secondary: "1 hour ago",
      time: "7:34 PM",
    },
  },
];
