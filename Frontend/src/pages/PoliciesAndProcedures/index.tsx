import PoliciesAndProcedures from "./PoliciesAndProcedures";
import SidebarProvider from "./context/SidebarProvider";

const PoliciesAndProceduresWithProvider = () => {
  return (
    <SidebarProvider>
      <PoliciesAndProcedures />
    </SidebarProvider>
  );
};

export default PoliciesAndProceduresWithProvider;
