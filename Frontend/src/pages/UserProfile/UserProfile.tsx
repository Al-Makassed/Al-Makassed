import { Card, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import ActivityCard from "./components/ActivityCard/ActivityCard";
import DetailsCard from "./components/DetailsCard/DetailsCard";
import HomeCard from "./components/HomeCard";
import InformationCard from "./components/InformationCard/InformationCard";
import SideCard from "./components/SideCard";
import { ChoiceName } from "./constants";
import useGetUser from "./hooks/useGetUser";
import UserProfileLoadingSkeleton from "./components/UserProfileLoadingSkeleton";

const UserProfile: FC = () => {
  const [choice, setChoice] = useState<ChoiceName>(ChoiceName.Home);

  const { userId } = useAppSelector(selectUser);

  const { user, isFetching } = useGetUser(userId);

  if (isFetching) return <UserProfileLoadingSkeleton />;

  if (!user) return null;

  const {
    department: { head },
  } = user;

  return (
    <Grid
      container
      sx={{
        bgcolor: "grey.100",
        p: { xs: 2, md: 2.5 },
        height: "calc(100vh - 64px)",
      }}
      display={{ xs: "block", md: "flex" }}
      justifyContent={{ xs: "flex-start", md: "center" }}
    >
      <Grid
        item
        xs={0}
        md={4}
        lg={3}
        pr={1}
        display={{ xs: "none", md: "block" }}
      >
        <SideCard choice={choice} setChoice={setChoice} />
      </Grid>

      <Grid item xs={12} md={8} pl={{ xs: 0, sm: 2 }}>
        <Stack gap={2.2}>
          <Grid item>
            <InformationCard user={user!} />
          </Grid>
          <Grid item>
            <Card
              sx={{
                p: 3,
                height: "calc(100vh - 64px - 40px - 211px - 16px)",
              }}
            >
              {choice === ChoiceName.Home && <HomeCard />}
              {choice === ChoiceName.Details && <DetailsCard head={head} />}
              {choice === ChoiceName.Activity && <ActivityCard />}
            </Card>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
