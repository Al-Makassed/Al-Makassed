import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PolicySearchResponse, SearchResponse } from "../API/types";
import { ResultsListItemButtonProps } from "../types";
import { typeToString } from "../utils";
import EntityIcon from "./EntityIcon";

const ResultsListItemButton: FC<ResultsListItemButtonProps> = ({
  result,
  handleClose,
}) => {
  const navigate = useNavigate();

  const handleClick = (result: SearchResponse) => {
    switch (result.searchEntityType) {
      case 1:
        navigate(
          `/me/policies-and-procedures/${
            (result as PolicySearchResponse).chapterId
          }/policies/${result.id}`,
        );
        break;

      case 4:
        navigate(`/me/monitoring-tools/task/${result.id}`);
        break;
    }

    handleClose();
  };
  return (
    <ListItemButton
      sx={{
        border: "0.1rem solid",
        borderColor: "primary.main",
        borderRadius: 4,
        minHeight: 70,
        ":hover": {
          backgroundColor: teal[50],
          color: "primary.main",
        },
        alignItems: "center",
      }}
      onClick={() => handleClick(result)}
    >
      <ListItemIcon sx={{ minWidth: "fit-content", mr: 1.5 }}>
        <EntityIcon entityType={result.searchEntityType} />
      </ListItemIcon>

      <ListItemText primary={result.name} />

      {/* <ArrowLeftIcon
        sx={{
          mr: 1,
          color: "primary.main",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      /> */}

      <Chip
        label={typeToString(result.searchEntityType)}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[200],
          border: "0.01rem solid lightGray",
          color: "text.secondary",
          fontWeight: "600",
        }}
      />
    </ListItemButton>
  );
};

export default ResultsListItemButton;
