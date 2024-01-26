import AddIcon from "@mui/icons-material/AddRounded";
import { Button, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "src/store/hooks";
import AnnouncementDialog from "./components/AnnouncementDialog";
import StatisticsGrid from "./components/StatisticsGrid";
import { selectIsManagerUser } from "src/features/user";

const Home: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isManager = useAppSelector(selectIsManagerUser);

  return (
    <>
      <Grid
        container
        py={2}
        px={2}
        height={{ xs: "100%", lg: "calc(100vh - 64px)" }}
        sx={{
          background: `linear-gradient(to bottom left, #0096881a, #ffffff 75%)`,
        }}
      >
        <Grid item xs={12} lg={6.5} pr={{ lg: 2 }}>
          <Stack direction="row" alignItems="center">
            Announcement
            {isManager && (
              <Button
                variant="contained"
                color="error"
                startIcon={<AddIcon />}
                sx={{ ml: "auto" }}
                onClick={() => setIsDialogOpen(true)}
              >
                Announcement
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5.5}>
          <StatisticsGrid />
        </Grid>
      </Grid>
      <AnnouncementDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Home;
