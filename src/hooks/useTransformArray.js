import { useSpring, useTransform } from "framer-motion"

// Very illegal and fun
const useTransformArray = ({
  properties,
  scrollY,
}) => {
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const sprungY = useSpring(scrollY, physics)
  return Object.fromEntries(
    Object.entries(properties).map(([key, valArr]) => {
      // need to create 'points' that framer can map our array of vals to.
      // Just split the number 1 (for 0-1) and divide by the amount of properties we're moving thru
      const arr = valArr.map((_, i) => (1 / valArr.length) * i)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return [key, useTransform(sprungY, arr, valArr)]
    })
  )
}

export default useTransformArray
