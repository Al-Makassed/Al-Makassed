import ArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import { Chip, ListItemIcon, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResponse } from "../API/types";
import { StyledListItemButton } from "../styled";
import { ResultsListItemButtonProps } from "../types";
import { handleEntityClick } from "../utils/searchEntityHandlers";
import { typeToString } from "../utils/utils";
import EntityIcon from "./EntityIcon";

export const ResultsListItemButton: FC<ResultsListItemButtonProps> = ({
  result,
  handleClose,
}) => {
  const [isHovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const handleClick = (result: SearchResponse) => {
    handleEntityClick(result, navigate, window.open);
    handleClose();
  };

  return (
    <StyledListItemButton
      onClick={() => handleClick(result)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ListItemIcon sx={{ minWidth: "fit-content", mr: 1.5 }}>
        <EntityIcon entityType={result.searchEntityType} />
      </ListItemIcon>

      <ListItemText primary={result.name} />

      <ArrowLeftIcon
        sx={{
          mr: 1,
          color: "primary.main",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      <Chip
        label={typeToString(result.searchEntityType)}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[200],
          border: "0.01rem solid lightGray",
          color: "text.secondary",
          fontWeight: "600",
        }}
      />
    </StyledListItemButton>
  );
};

export default ResultsListItemButton;
