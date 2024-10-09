import React, { useState, useEffect } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getFormattedDate());
    }, 60 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getFormattedDate() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("id-ID", options);
  }

  return <div>{currentDate}</div>;
};

export default CurrentDate;
