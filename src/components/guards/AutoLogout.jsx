import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/slices/user.slice";
import { openModal } from "redux/slices/modal.slice";
import { useSelector } from "react-redux";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const user = useSelector((state) => state.user.user);

  const handleUserActivity = () => {
    setLastActivityTime(Date.now());
    // console.log(lastActivityTime, "last");
  };

  useEffect(() => {
    const logoutTimer =
      user &&
      setInterval(() => {
        const inactivityThreshold = 15 * 60 * 10000;
        // time when interval check happens. NB: dependency has to be triggered for useEffect
        const timePerInterval = Date.now();
        const inactiveTime = timePerInterval - lastActivityTime;
        // console.log(timePerInterval, "ini");

        if (inactiveTime > inactivityThreshold) {
          dispatch(logoutUser());
          dispatch(
            openModal({
              title: "Inactive",
              message:
                "You were logged out, because you were inactive for too long",
              success: false,
            })
          );
          clearInterval(logoutTimer);
        }
      }, 1000);

    // window.addEventListener("mousemove", handleUserActivity);
    user && window.addEventListener("click", handleUserActivity);
    // window.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearInterval(logoutTimer);
      //   window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      //   window.removeEventListener("touchstart", handleUserActivity);
    };
  }, [lastActivityTime]);

  return null; // The component doesn't render anything, it just handles the logic
};

export default AutoLogout;
