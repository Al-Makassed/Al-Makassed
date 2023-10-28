import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDependency } from "../API";
import { CHAPTERS_QUERY_KEY } from "../Constants";

const usePostDependency = () => {
  const queryClient = useQueryClient();

  const { mutate: addNewDependency } = useMutation({
    mutationFn: postDependency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAPTERS_QUERY_KEY,
      });
    },
  });

  return {
    addNewDependency,
  };
};

export default usePostDependency;
