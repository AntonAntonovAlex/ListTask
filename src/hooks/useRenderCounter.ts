import { useEffect, useRef } from "react";

const useRenderCounter = () => {
    const counter = useRef(1);
    useEffect(() => {
      counter.current++;
    });
    return counter.current;
  };

  export default useRenderCounter;