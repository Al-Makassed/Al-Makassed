import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error("useCounterContext must be used within a SidebarProvider");

  return context;
};

export default useSidebarContext;
