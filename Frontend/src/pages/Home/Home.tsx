import AddIcon from "@mui/icons-material/AddRounded";
import { Button, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import { selectIsManagerUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppSelector } from "src/store/hooks";
import AnnouncementDialog from "./components/AnnouncementDialog";
import AnnouncementsList from "./components/AnnouncementsList";
import StatisticsGrid from "./components/StatisticsGrid";
import WelcomeSection from "./components/WelcomeSection";
import StatisticsDialog from "./components/StatisticsDialog";

const Home: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isManager = useAppSelector(selectIsManagerUser);

  const { isDesktopOrMore } = useMediaQuery();

  return (
    <>
      <Grid
        container
        pt={2}
        px={2}
        height={{ md: "calc(100vh - 64px)" }}
        sx={{
          background: `linear-gradient(to bottom left, #0096881a, #ffffff)`,
        }}
        rowGap={2}
      >
        <Grid item xs={12} md={8} lg={6.5} pr={{ lg: 2 }}>
          <Stack direction="row" alignItems="center">
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

          <WelcomeSection />

          <AnnouncementsList />
        </Grid>

        {isDesktopOrMore && (
          <Grid item xs={12} md={4} lg={5.5}>
            <StatisticsGrid />
          </Grid>
        )}
      </Grid>
      <AnnouncementDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <StatisticsDialog isOpen={false} onClose={() => void {}} />
    </>
  );
};

export default Home;
