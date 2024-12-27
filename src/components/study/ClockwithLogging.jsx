import React, { useState, useEffect } from 'react';

// This is an example component to demonstrate the use of useEffect with a cleanup function
// The component sets up an interval that logs the current value every 2 seconds
// The interval is cleared when the component is unmounted
// the unmouting is done by the cleanup function which is returned from useEffect hook 
// The component also has a button that increments the value
// The value is stored in the component's state
// The value is incremented when the button is clicked
// when the value is incremented, the component logs the new value to the console and that means that the component is rerendered


function SimpleIntervalExample() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let intervalId; // Declare intervalId inside useEffect

    const runInterval = () => {
      console.log("Interval running. Value at creation:", value); // Key log
    };

    intervalId = setInterval(runInterval, 2000); // Set interval

    return () => {
      console.log("Cleanup running. Clearing interval:", intervalId);
      clearInterval(intervalId); // Clear the interval
    };
  }, []); // Empty dependency array: runs only once

  const handleClick = () => {
    setValue(value + 1);
    console.log("Value after click:", value +1)
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={handleClick}>Increment Value</button>
    </div>
  );
}

export default SimpleIntervalExample;