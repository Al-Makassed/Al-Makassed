import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../schema";
import useLoginAPI from "./useLoginAPI";

const useLogin = () => {
  const { loginUser, isLoggingIn } = useLoginAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit((user) => {
    loginUser(user);
  });

  return {
    register,
    handleSubmitForm,
    errors,
    isLoggingIn,
  };
};

export default useLogin;
