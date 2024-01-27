import { Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { FC } from "react";
import { selectUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";

const WelcomeSection: FC = () => {
  const { fullName } = useAppSelector(selectUser);

  return (
    <Stack justifyContent="center" alignItems="center" position="relative">
      <Typography
        variant="h1"
        fontWeight={700}
        fontSize={{ xs: "3.5rem", sm: "7rem" }}
        color={teal[100]}
      >
        Welcome
      </Typography>

      <Typography
        fontWeight={500}
        fontSize={{ xs: "0.9rem", lg: "1.3rem" }}
        textAlign="center"
        position="absolute"
        width="538px"
        bgcolor={(theme) => theme.palette.grey[100]}
        px={1}
        sx={{
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        ml={1}
      >
        Welcome Back {fullName}
      </Typography>
    </Stack>
  );
};

export default WelcomeSection;
