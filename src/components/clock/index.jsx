import { useState, useEffect } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return <span className="fw-semibold fs-3 my-2 p-2">{date.toLocaleTimeString("fr-FR")}</span>;
}

export default Clock;