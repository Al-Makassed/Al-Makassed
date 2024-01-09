import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import choose from "src/animation/choose.json";
import { selectIsManagerUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";
import useSidebarContext from "../context/useSidebar";
import AddChapterButton from "./AddChapterButton";

const DefaultView = () => {
  const isManager = useAppSelector(selectIsManagerUser);

  const {
    state: { isSidebarOpen },
  } = useSidebarContext();

  return (
    <Stack sx={{ alignItems: "flex-end" }}>
      <Stack
        height={"calc(100vh - 96px)"}
        width={isSidebarOpen ? "calc(100vw - 400px)" : "100vw"}
        sx={{
          transition: "width 200ms ease-in-out",
        }}
      >
        {isManager && <AddChapterButton />}

        <Stack
          sx={{ justifyContent: "center", alignItems: "center" }}
          height={"calc(100vh - 64px - 32px - 90px)"}
        >
          {isSidebarOpen && (
            <Lottie
              animationData={choose}
              style={{ width: "calc(100vw - 400px)", maxHeight: "calc(50vh)" }}
            />
          )}
          {!isSidebarOpen && (
            <Lottie
              animationData={choose}
              style={{ width: "calc(100vw)", maxHeight: "calc(50vh)" }}
            />
          )}

          <Typography
            variant="h1"
            fontSize={{
              xs: "h5.fontSize",
              sm: "h4.fontSize",
            }}
            pl={{ sm: 2, md: 0 }}
            fontWeight={500}
            sx={{
              textAlign: "center",
              textAlignLast: "center",
              width: "100%",
              color: "grey.700",
            }}
          >
            Choose a Policy to be viewed
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DefaultView;
