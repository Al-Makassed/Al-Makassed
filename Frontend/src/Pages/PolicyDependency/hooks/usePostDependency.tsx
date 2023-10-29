import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewDependency } from "../API";
import { DEPENDENCIES_QUERY_KEY } from "../constants";

const usePostDependency = () => {
  const queryClient = useQueryClient();

  const { mutate: addDependency } = useMutation({
    mutationFn: addNewDependency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEPENDENCIES_QUERY_KEY,
      });
    },
  });

  return {
    addDependency,
  };
};

export default usePostDependency;
