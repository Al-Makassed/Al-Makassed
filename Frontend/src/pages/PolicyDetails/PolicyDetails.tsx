import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useMediaQuery from "src/hooks/useMediaQuery";
import useSidebarContext from "../PoliciesAndProcedures/context/useSidebar";
import DetailsTabs from "./components/DetailsTabs";
import Header from "./components/Header";
import PolicyDetailsLoadingSkeleton from "./components/PolicyDetailsLoadingSkeleton";
import useGetPolicy from "./hooks/useGetPolicy";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PolicyDetails: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const {
    state: { isSidebarOpen },
    closeSidebar,
  } = useSidebarContext();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy, isFetching } = useGetPolicy(chapterId, policyId);

  const { isTabletOrLess, isLargeDesktop } = useMediaQuery();

  const handleCloseSideBar = () => closeSidebar();

  if (isFetching) {
    isSidebarOpen && isTabletOrLess && handleCloseSideBar();
    return <PolicyDetailsLoadingSkeleton />;
  }

  if (!policy) return null;

  return (
    <Stack
      p={5}
      width="100%"
      height="100vh"
      gap={3}
      // pr={5}
      // pl={{ xs: 5, sm: isSidebarOpen ? 5 : 9 }}
      // py={{ xs: 5, md: 1.75 }}
      // width={isSidebarOpen ? "calc(100vw - 400px)" : "100vw"}
      sx={{
        transition: "width 350ms ease-in-out",
      }}
    >
      <Breadcrumbs
        aria-label="policy breadcrumb"
        maxItems={isLargeDesktop ? 4 : 2}
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/me/policies-and-procedures"
        >
          Chapters
        </Link>
        {/* //TODO: when chapter dialog is implemented and the href */}
        <Link underline="hover" color="inherit">
          {chapterId}
        </Link>
        <Link underline="none" color="inherit">
          Policies
        </Link>
        <Typography color="text.primary">{policy.name}</Typography>
      </Breadcrumbs>

      <Header policy={policy} />

      <DetailsTabs policy={policy} />
    </Stack>
  );
};

export default PolicyDetails;
