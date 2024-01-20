import { Stack } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from "src/hooks/useMediaQuery";
import useSidebarContext from "../PoliciesAndProcedures/context/useSidebar";
import DetailsTabs from "./components/DetailsTabs";
import Header from "./components/Header";
import PolicyDetailsLoadingSkeleton from "./components/PolicyDetailsLoadingSkeleton";
import useGetPolicy from "./hooks/useGetPolicy";

const PolicyDetails: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const {
    state: { isSidebarOpen },
    closeSidebar,
  } = useSidebarContext();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy, isFetching } = useGetPolicy(chapterId, policyId);

  const { isTabletOrLess } = useMediaQuery();

  const handleCloseSideBar = () => closeSidebar();

  if (isFetching) {
    isSidebarOpen && isTabletOrLess && handleCloseSideBar();
    return <PolicyDetailsLoadingSkeleton />;
  }

  if (!policy) return null;

  return (
    <Stack alignItems={isSidebarOpen ? "flex-end" : "flex-start"}>
      <Stack
        gap={3}
        pr={5}
        pl={{ xs: 5, sm: 9 }}
        py={9}
        width={isSidebarOpen ? "calc(100vw - 400px)" : "100vw"}
        sx={{
          transition: "width 350ms ease-in-out",
        }}
      >
        <Header policy={policy} />

        <DetailsTabs policy={policy} />

        {/* <PolicyDependencies chapterId={chapterId} policyId={policyId} /> */}
      </Stack>
    </Stack>
  );
};

export default PolicyDetails;
