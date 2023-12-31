import * as elements from "typed-html";
import { useEffect, useState, addOnClick } from "../hooks";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount(count + 1);
  };

  addOnClick("increaseCount", increaseCounter);

  let isHigherThan5: string = "";

  useEffect(() => {
    isHigherThan5 = count > 5 ? "Yes" : "No";
  }, [count, isHigherThan5]);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button id="increaseCount">Increase count</button>
      <p>
        Is the count higher than 5? <strong>{isHigherThan5}!</strong>
      </p>
    </div>
  );
};

export default Counter;
