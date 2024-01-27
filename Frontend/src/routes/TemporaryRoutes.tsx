import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// pages
const Counter = lazy(() => import("src/pages/Counter"));
const Counter2 = lazy(() => import("src/pages/Counter2"));
const DataGridInfinitePlayground = lazy(
  () => import("src/pages/DataGridInfinitePlayground"),
);
const DataGridPaginatedPlayground = lazy(
  () => import("src/pages/DataGridPaginatedPlayground"),
);
const InfiniteScrollPlayground = lazy(
  () => import("src/pages/InfiniteScrollPlayground"),
);

/**
 * @description Routes for learning and testing new features and libraries
 */
const temporaryRoutes: RouteObject = {
  path: "",
  children: [
    {
      path: "counter",
      element: <Counter />,
    },
    {
      path: "counter-with-provider",
      element: <Counter2 />,
    },
    {
      path: "data-grid-infinite",
      element: <DataGridInfinitePlayground />,
    },
    {
      path: "data-grid-paginated",
      element: <DataGridPaginatedPlayground />,
    },
    {
      path: "infinite-scroll",
      element: <InfiniteScrollPlayground />,
    },
  ],
};

export default temporaryRoutes;
