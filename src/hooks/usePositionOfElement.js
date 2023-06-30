import { useState, useCallback, useEffect } from "react";
import useResizeObserver from "@react-hook/resize-observer";

const usePositionOfElement = (ref) => {
  // set ref position and size to state
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    pageBottom: 0,
    pageTop: 0,
  });

  // Compute position and size of element
  const computeSize = useCallback(() => {
    if (ref.current) {
      const { top, right, left, bottom, width, height, x, y } =
        ref.current.getBoundingClientRect();

      // add offset Y from thr document top to the top(from viewport) relative to the current ref
      const pageTop = window.scrollY + top;
      const pageBottom = pageTop + height;

      setPosition({
        top,
        right,
        left,
        bottom,
        width,
        height,
        x,
        y,
        pageBottom,
        pageTop,
      });
    }
  }, [ref]);

  useEffect(() => {
    computeSize();
  }, [ref, computeSize]);

  useResizeObserver(ref, () => computeSize());

  return {
    toJSON: () => position,
  };
};

export default usePositionOfElement;
