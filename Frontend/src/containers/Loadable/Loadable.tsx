import { Suspense, ComponentType } from "react";
import Loader from "src/containers/BlockUI";

/**
 * Wraps a component in a Suspense component with a fallback loader
 * @param Component - The component to wrap
 * @returns a component wrapped in a Suspense component with a fallback loader
 */
const Loadable = (Component: ComponentType<any>) => {
  const LoadableComponent = (props: any) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || "Component"})`;

  return LoadableComponent;
};

export default Loadable;
