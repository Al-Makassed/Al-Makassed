import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonIcon from "@mui/icons-material/Person";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { PolicyDependencyType } from "../constants";
import useGetDependency from "../hooks/useGetDependency";
import { ViewDependencyDialogProps } from "../types";
import ViewDependencyDialogSkeleton from "./ViewDependencyDialogSkeleton";

const ViewDependencyDialog: FC<ViewDependencyDialogProps> = ({
  info: { chapterId, policyId },
  dependencyId,
  open,
  onClose,
}) => {
  const { dependency, isFetching } = useGetDependency({
    chapterId,
    policyId,
    id: dependencyId!,
  });

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={dependency?.name} />
  );

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        {DialogHeader}
        <MaqasidDialog.Actions>
          {dependency?.type === PolicyDependencyType.Form && (
            <Chip label="Form" />
          )}
          {dependency?.type === PolicyDependencyType.Poster && (
            <Chip label="Poster" />
          )}
          {dependency?.type === PolicyDependencyType.Protocol && (
            <Chip label="Protocol" />
          )}
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      {isFetching ? (
        <MaqasidDialog.Body>
          <ViewDependencyDialogSkeleton />
        </MaqasidDialog.Body>
      ) : (
        <MaqasidDialog.Body>
          <Stack gap={2.5}>
            <Stack direction="row" alignItems="center" gap={1}>
              <VpnKeyIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2"> Code: </Typography>
              <Typography>{dependency?.code}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <AccessAlarmsIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2">EstimatedTime: </Typography>
              <Typography>{dependency?.estimatedTimeInMin}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <PersonIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2"> CreatorId: </Typography>

              <Typography> {dependency?.creatorId}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <AutoStoriesIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2"> PagesCount:</Typography>

              <Typography> {dependency?.pagesCount}</Typography>
            </Stack>

            <Stack direction="row">
              <PictureAsPdfIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Button
                href={dependency?.pdfUrl || ""}
                target="_blank"
                variant="text"
                sx={{ textTransform: "none", mt: -1, ml: -2 }}
              >
                Open Dependency File
              </Button>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewDependencyDialog;
