// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getDepartments } from "../API";
// import { FOCAL_POINT_QUERY_KEY } from "../constants";
// import { showErrorSnackbar } from "src/features/snackbar";
// import { useAppDispatch } from "src/store/hooks";
// import { extractErrorMessage } from "src/utils";
// import { AxiosBaseError } from "src/types/axios";

// const useGetFocalPoints = () => {
//   const dispatch = useAppDispatch();

//   const { data: focalPoints, error } = useQuery({
//     queryFn: () => getFocalPoints(),
//     queryKey: FOCAL_POINT_QUERY_KEY,
//   });

//   useEffect(() => {
//     if (!error) return;

//     const message = extractErrorMessage(error as AxiosBaseError);
//     dispatch(
//       showErrorSnackbar({
//         message,
//       }),
//     );
//   }, [error]);

//   return {
//     focalPoints,
//   };
// };

// export default useGetFocalPoints;
