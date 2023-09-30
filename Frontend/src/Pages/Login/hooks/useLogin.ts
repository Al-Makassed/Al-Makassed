import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import loginSchema from "../schema";

const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleSubmitForm = handleSubmit((data) => {
        console.log(data);
    });
    
    return {
        register,
        handleSubmitForm,
        errors,
    }
};

export default useLogin;
