import React, { ComponentType, FC } from "react";
import pageAccessRights from "./pageAccessRights";
import { Role } from "src/routes/types";
import { RouteConfigs } from "./HOCs/types";
import { Navigate } from "react-router-dom";

const routeHOC =
  <ComponentProps extends object>(configs: RouteConfigs) =>
  (Component: ComponentType<ComponentProps>) => {
    const { pageAccessName, title } = configs;
    document.title = title;

    const WrappedComponent: FC<ComponentProps> = (props) => {
      // If pageAccessName is not provided, then the page is accessible to all users
      if (!pageAccessName) return <Component {...props} />;

      const pageAccessRight = pageAccessRights.get(pageAccessName);

      // If pageAccessName is undefined in the pageAccessRights map, then the page is accessible to all users
      if (!pageAccessRight) return <Component {...props} />;

      const userRoles: Role[] = ["Admin"]; // TODO: get user roles from redux store

      const hasAccess = pageAccessRight.roles.some((roleGroup) => {
        const pass = roleGroup.every((role) => userRoles.includes(role));
        console.log(pass);
        return pass;
      });

      if (!hasAccess) return <Navigate to="/access-denied" replace={true} />;

      return <Component {...props} />;
    };

    return WrappedComponent;
  };

export default routeHOC;
