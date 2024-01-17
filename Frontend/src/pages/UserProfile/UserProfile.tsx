import { Card, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import DetailsSection from "./components/DetailsCard/DetailsSection";
import HomeCard from "./components/HomeCard";
import InformationCard from "./components/InformationCard/InformationCard";
import SideCard from "./components/SideCard";
import { ChoiceName } from "./constants";
import useGetUser from "./hooks/useGetUser";
import PoliciesProgressCard from "./components/PoliciesProgressCard/PoliciesProgressCard";

const UserProfile: FC = () => {
  const [choice, setChoice] = useState<ChoiceName>(ChoiceName.Home);

  const { userId } = useAppSelector(selectUser);

  const { user } = useGetUser(userId);

  if (!user) return null;

  const {
    department: { head },
  } = user;

  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 3 },
        height: "calc(100vh - 64px)",
      }}
    >
      <Grid item xs={0} md={4} pr={1} display={{ xs: "none", md: "block" }}>
        <SideCard choice={choice} setChoice={setChoice} />
      </Grid>

      <Grid item xs={12} md={8} pl={{ xs: 0, sm: 2 }}>
        <Stack gap={2.2}>
          <Grid item>
            <InformationCard user={user!} />
          </Grid>
          <Grid item>
            <Card sx={{ p: 3 }}>
              {choice === ChoiceName.Home && <HomeCard />}
              {choice === ChoiceName.Details && <DetailsSection head={head} />}
              {choice === ChoiceName.PoliciesProgress && (
                <PoliciesProgressCard />
              )}
            </Card>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
