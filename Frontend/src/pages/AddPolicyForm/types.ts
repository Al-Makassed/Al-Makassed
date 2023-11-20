import { PolicyResponse } from "./API/types";

export interface AddPolicyProps {
  open: boolean;
  onClose: () => void;
  chapterId: string;
}

export interface AddPolicyFormPayload extends PolicyResponse {}
