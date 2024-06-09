import { Button } from "@nextui-org/react";
import { useState } from "react";

const Counter = ({cantidad = 1}) => {
  const [count, setCounter] = useState(cantidad);

  const increment = () => {
    if (count < 2) {
      setCounter(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCounter(count - 1);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          onClick={decrement}
          variant="bordered"
          radius="full"
          isIconOnly
          className="w-6 h-6 min-w-6"
        >
          -
        </Button>
        <span >{count}</span>
        <Button
          onClick={increment}
          radius="full"
          isIconOnly
          className="w-6 h-6 min-w-6 bg-black text-white"
        >
          +
        </Button>
      </div>
    </>
  );
};

export default Counter;
