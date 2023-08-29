import React from "react";
import { motion, useScroll } from "framer-motion";
import useTransformArray from "hooks/useTransformArray";
import { ScrollCtx } from "context/scrollContext";

const StaticRender = ({
  scrollY,
  style = {},
  properties = {},
  inViewProperties = {},
  children,
}) => {
  const [zProps] = React.useState(properties);
  const props = useTransformArray({ properties: zProps, scrollY });
  return (
    <motion.div
      style={{ ...props, ...style }}
      initial={{
        ...Object.fromEntries(
          Object.entries(inViewProperties).map(([k, v]) => {
            return [k, v[0]];
          })
        ),
      }}
      whileInView={{
        ...Object.fromEntries(
          Object.entries(inViewProperties).map(([k, v]) => {
            return [k, v[1]];
          })
        ),
        transition: { duration: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};

const ScrollEffect = ({
  properties = {},
  inViewProperties = {},
  pin = false,
  children,
  internalScroller = false,
}) => {
  const ctx = React.useContext(ScrollCtx);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <StaticRender
        key={JSON.stringify(properties)}
        style={{ width: "100%", height: "100%" }}
        scrollY={
          (ctx && ctx.progress && internalScroller) === false
            ? ctx.progress
            : scrollYProgress
        }
        properties={properties}
        inViewProperties={inViewProperties}
      >
        {children}
      </StaticRender>
    </div>
  );
};

export default ScrollEffect;
