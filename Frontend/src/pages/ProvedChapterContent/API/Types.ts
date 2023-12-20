export interface ApprovalRequests {
  title: string;
  createdAt: string;
  requesterId: string;
  entityType: number;
  entityId: string;
  info: Info;
}
export interface Info {
  id: string;
}
