import Counter2 from "./Counter2";
import CounterProvider from "./context/CounterProvider";

const Counter2WithProvider = () => {
  return (
    <CounterProvider>
      <Counter2 />
    </CounterProvider>
  );
};

export default Counter2WithProvider;
