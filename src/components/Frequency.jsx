import React from 'react';

function Frequency({ stations, currentStationIndex }) {
  return (
    <div>
        <div id="frequency-display">{stations[currentStationIndex].frequency}</div>
    </div>
  );
}

export default Frequency;