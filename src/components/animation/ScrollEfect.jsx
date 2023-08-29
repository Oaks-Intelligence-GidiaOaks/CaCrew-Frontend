import React from "react";
import { motion, useScroll } from "framer-motion";
import useTransformArray from "hooks/useTransformArray";
import { ScrollCtx } from "context/scrollContext";

const StaticRender = ({
  scrollY,
  transformOrigin = "center center",
  properties = {},
  inViewProperties = {},
  inViewTransitionTime,
  inViewDelay,
  runOnce,
  isPast,
  children,
}) => {
  const [zProps] = React.useState(properties);
  const props = useTransformArray({ properties: zProps, scrollY });
  return (
    <motion.div
      style={{ ...props, transformOrigin, transition: "0.05s" }}
      initial={
        !isPast || !runOnce
          ? {
              ...Object.fromEntries(
                Object.entries(inViewProperties).map(([k, v]) => [k, v[0]])
              ),
            }
          : {
              ...Object.fromEntries(
                Object.entries(inViewProperties).map(([k, v]) => [k, v[1]])
              ),
            }
      }
      whileInView={{
        ...Object.fromEntries(
          Object.entries(inViewProperties).map(([k, v]) => {
            return [k, v[1]];
          })
        ),
        transition: { duration: inViewTransitionTime, delay: inViewDelay },
      }}
      viewport={{
        once: runOnce,
      }}
    >
      {children}
    </motion.div>
  );
};

const ScrollEffect = ({
  properties = {},
  inViewProperties = {},
  inViewTransitionTime = 0.4,
  inViewDelay = 0,
  runOnce = true,
  isPast = false,
  pin = false,
  children,
  internalScroller = false,
  className = "",
//   style = {},
  props,
}) => {
  const ctx = React.useContext(ScrollCtx);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <div ref={ref} className={className} {...props}>
      <StaticRender
        key={JSON.stringify(properties)}
        // style={{ width: "100%", height: "100%" }}
        scrollY={
          (ctx && ctx.progress && internalScroller) === false
            ? ctx.progress
            : scrollYProgress
        }
        properties={properties}
        inViewProperties={inViewProperties}
        inViewTransitionTime={inViewTransitionTime}
        inViewDelay={inViewDelay}
        runOnce={runOnce}
        isPast={isPast}
      >
        {children}
      </StaticRender>
    </div>
  );
};

export default ScrollEffect;
