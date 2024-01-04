import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "../API";
import { DEPARTMENT_QUERY_KEY } from "../constants";
import { useAppDispatch } from "src/store/hooks";
import { showSuccessSnackbar, showErrorSnackbar } from "src/features/snackbar";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";

const useAddDepartmentAPI = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const { mutate: addNewDepartment, isPending } = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DEPARTMENT_QUERY_KEY],
      });
      dispatch(
        showSuccessSnackbar({
          message: "Department added successfully",
        }),
      );
    },
    onError: (error: AxiosBaseError) => {
      const errorMessage = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          message: errorMessage,
        }),
      );
    },
  });

  return {
    addNewDepartment,
    isPending,
  };
};

export default useAddDepartmentAPI;
