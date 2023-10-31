// import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../API";
import { useNavigate } from "react-router-dom";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "../utils";
import { showErrorSnackbar } from "src/features/snackbar";
import { userLogin } from "src/features/user";
import { useDispatch } from "react-redux";

const useLoginAPI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: UserLogin } = useMutation({
    mutationFn: Login,
    onSuccess: (response) => {
      dispatch(userLogin(response.token));
      localStorage.setItem("accessToken", response.token);
      navigate("/home");
    },
    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          title: "Error",
          message: errorMessage,
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
        }),
      );
    },
  });

  return {
    UserLogin,
  };
};

export default useLoginAPI;
