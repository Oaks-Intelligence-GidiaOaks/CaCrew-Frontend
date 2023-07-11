import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/slices/user.slice";

const AutoLogout = () => {
  const dispatch = useDispatch();
  let lastActivityTime = Date.now();

  const handleUserActivity = () => {
    lastActivityTime = Date.now();
  };

  useEffect(() => {
    const logoutTimer = setInterval(() => {
      const inactivityThreshold = 10 * 60 * 1000;
      const currentTime = Date.now();
      const inactiveTime = currentTime - lastActivityTime;

      if (inactiveTime > inactivityThreshold) {
        console.log("User logged out due to inactivity");
        dispatch(logoutUser());
        clearInterval(logoutTimer);
      }
    }, 120000);

    // window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    // window.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearInterval(logoutTimer);
      //   window.removeEventListener("mousemove", handleUserActivity);
      window.addEventListener("click", handleUserActivity);
      //   window.removeEventListener("touchstart", handleUserActivity);
    };
  }, []);

  return null; // The component doesn't render anything, it just handles the logic
};

export default AutoLogout;
