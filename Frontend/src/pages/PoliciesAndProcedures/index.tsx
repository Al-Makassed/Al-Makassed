import routeHOC from "src/routes/HOCs/routeHOC";
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
  title: "Policies & Procedures",
  pageAccessName: "PoliciesAndProcedures",
});

export default withRouteHoC(PoliciesAndProceduresWithProvider);
