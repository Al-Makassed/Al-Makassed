import { ComponentType, FC } from "react";
import pageAccessRights from "../pageAccessRights";
import { RouteConfigs } from "../types";
import { Navigate } from "react-router-dom";
import { selectUserRoles } from "src/features/user/selectors";
import { useAppSelector } from "src/store/hooks";

const routeHOC =
  <ComponentProps extends object>(configs: RouteConfigs) =>
  (Component: ComponentType<ComponentProps>) => {
    const { pageAccessName, title } = configs;
    document.title = title;

    const WrappedComponent: FC<ComponentProps> = (props) => {
      const userRoles = useAppSelector(selectUserRoles);

      // If pageAccessName is not provided, then the page is accessible to all users
      if (!pageAccessName) return <Component {...props} />;

      const pageAccessRight = pageAccessRights.get(pageAccessName);

      // If pageAccessName is undefined in the pageAccessRights map, then the page is accessible to all users
      if (!pageAccessRight) return <Component {...props} />;

      const hasAccess = pageAccessRight.roles.some((roleGroup) => {
        return roleGroup.every((role) => userRoles.includes(role));
      });

      if (!hasAccess) return <Navigate to="/access-denied" replace={true} />;

      return <Component {...props} />;
    };

    return WrappedComponent;
  };

export default routeHOC;
