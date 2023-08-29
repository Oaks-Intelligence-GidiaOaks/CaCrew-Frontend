import React from "react";
import { useSpring, useTransform } from "framer-motion";

const TransformedProperty = ({ scrollY, valArr }) => {
  const physics = { damping: 30, mass: 0.05, stiffness: 200 };
  const sprungY = useSpring(scrollY, physics);

  const arr = valArr.map((_, i) => (1 / valArr.length) * i);
  const transVal = useTransform(sprungY, arr, valArr);

  return transVal;
};

const useTransformArray = ({ properties, scrollY }) => {
  return Object.fromEntries(
    Object.entries(properties).map(([key, valArr]) => {
      return [key, <TransformedProperty scrollY={scrollY} valArr={valArr} />];
    })
  );
};

export default useTransformArray;
