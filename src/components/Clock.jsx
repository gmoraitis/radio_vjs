import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const time = new Date();
      let hour = time.getHours();
      let min = time.getMinutes();

      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;

      setCurrentTime(hour + ":" + min);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      The current time is: <span id="clock">{currentTime}</span>
    </div>
  );
}

export default Clock;