'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    if (title === "Rest") {
        onChange(value + 10);
    }
    else {
        onChange(value + 1);
    }


  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (title === "Rest" && value === 10) {
        return;
    }
    else if (title === "Rest") {
        onChange(value - 10);
    }
    else if (value === 1) {
        return;
    }
    else  {
      onChange(value -1);
    }
  }, [onChange, value]);

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-neutral-300">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-teal-600
            flex
            items-center
            justify-center
            text-teal-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </div>
        <div 
          className="
            font-light 
            text-xl 
            text-neutral-300
          "
        >
            {value}
          </div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-teal-600
            flex
            items-center
            justify-center
            text-teal-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
   );
}
 
export default Counter;