import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../schema";
import useLoginAPI from "./useLoginAPI";

const useLogin = () => {
  const { UserLogin } = useLoginAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = handleSubmit((user) => {
    UserLogin(user);
    // console.log(user);
  });

  return {
    register,
    handleSubmitForm,
    errors,
  };
};

export default useLogin;
