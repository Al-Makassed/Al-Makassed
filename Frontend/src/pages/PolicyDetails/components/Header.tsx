import { Stack, Typography, Tooltip, IconButton } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Policy } from "../API/types";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "src/store/hooks";
import { selectIsAdminUser } from "src/features/user";

export interface HeaderProps {
  policy: Policy;
}

const Header: FC<HeaderProps> = ({ policy }) => {
  const isAdmin = useAppSelector(selectIsAdminUser);

  const navigate = useNavigate();

  const handleEditPolicy = () => {
    navigate(
      `/me/policies-and-procedures/${policy?.chapterId}/policies/edit/${policy?.id}`,
    );
  };
  return (
    <Stack direction="row">
      <Typography fontWeight={600} variant="h5">
        {policy.name}
      </Typography>

      {isAdmin && (
        <Tooltip title="Edit Policy">
          <IconButton
            aria-label="Edit Policy"
            sx={{ mr: 1 }}
            onClick={handleEditPolicy}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default Header;
