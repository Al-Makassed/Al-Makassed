import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postChapter } from "../API";
import { CHAPTERS_QUERY_KEY } from "../constants";

const useSidebarAPI = () => {
  const queryClient = useQueryClient();

  const { mutate: addNewChapter } = useMutation({
    mutationFn: postChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAPTERS_QUERY_KEY,
      });
    },
  });

  return {
    addNewChapter,
  };
};

export default useSidebarAPI;
