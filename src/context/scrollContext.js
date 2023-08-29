import React from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import usePositionOfElement from "hooks/usePositionOfElement";
import useIsTouchDevice from "hooks/useIsTouchDevice";

export const ScrollCtx = React.createContext({});

const ScrollArea = ({
  children,
  smooth = false,
  smoothMass = 0.05,
  pin
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  const { width, height, pageTop } = usePositionOfElement(ref);
  const isTouch = useIsTouchDevice();

  const reversePosition = useTransform(scrollY, (x) => -x);
  const physics = { damping: 30, mass: smoothMass, stiffness: 200 };
  const sprungY = useSpring(reversePosition, physics);

  const fixedPosition = useTransform(sprungY, (v) => {
    if (-v >= 0 && -v < height) {
      return 0;
    }
    if (-v > height) {
      return v + height;
    }
    return v;
  });

  return (
    <ScrollCtx.Provider
      value={{
        progress: scrollYProgress
      }}
    >
      <motion.div
        style={
          height && smooth && !isTouch
            ? {
                position: "fixed",
                left: 0,
                top: pageTop,
                width: "100%",
                y: fixedPosition
              }
            : {}
        }
      >
        <div ref={ref}>{children}</div>
      </motion.div>
      {height && (
        <div
          style={{
            paddingBottom: `${window.innerHeight}px`
          }}
        />
      )}
      {height && smooth && !isTouch && (
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            backgroundColor: "green"
          }}
        />
      )}
    </ScrollCtx.Provider>
  );
};

export default ScrollArea;
