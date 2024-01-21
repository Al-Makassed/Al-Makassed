import { SearchEntityType, SearchResponse } from "./API/types";

export interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ResultsListItemButtonProps {
  result: SearchResponse;
  handleClose: () => void;
}

export interface EntityIconProps {
  entityType: SearchEntityType;
}
