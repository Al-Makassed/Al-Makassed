import routeHOC from "src/routes/routeHOC";
import PoliciesAndProcedures from "./PoliciesAndProcedures";
import SidebarProvider from "./context/SidebarProvider";

const PoliciesAndProceduresWithProvider = () => {
  return (
    <SidebarProvider>
      <PoliciesAndProcedures />
    </SidebarProvider>
  );
};

const withRouteHoC = routeHOC({
  title: "PoliciesAndProcedures",
  pageAccessName: "PoliciesAndProceduresWithProvider",
});

export default withRouteHoC(PoliciesAndProceduresWithProvider);
