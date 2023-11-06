import React, { FC } from "react";
import Lottie from "lottie-react";
import infinityLoader from "src/animation/infinityLoader.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const BlockUI: FC = () => {
  return (
    <Modal
      aria-labelledby="suspense-modal"
      aria-describedby="Waiting for data to load"
      open={true}
      style={{ zIndex: 1400 }}
      hideBackdrop
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/*<CircularProgress size={50} />*/}
        <Lottie
          animationData={infinityLoader}
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    </Modal>
  );
};

export default BlockUI;
