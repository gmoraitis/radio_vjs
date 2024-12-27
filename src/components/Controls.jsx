// Controls.jsx
import React from 'react';

function Controls({ stations, currentStationIndex, onStationChange, onPlay, onStop, onVolumeUp, onVolumeDown, isPlaying, onInfoToggle }) {
    console.log("onInfoToggle:", typeof onInfoToggle);

  const handleNext = () => {
    onStationChange((currentStationIndex + 1) % stations.length);
  };

  const handlePrev = () => {
    onStationChange((currentStationIndex - 1 + stations.length) % stations.length);
  };

  const handleVolumeUp = () => {
    onVolumeUp();
  }

const handleVolumeDown = () => {
    onVolumeDown();
}



  return (
    <div>
      <button id='controls' onClick={handlePrev}><i class="material-icons">skip_previous</i></button>
      <button id ='controls'onClick={isPlaying ? onStop : onPlay}>{isPlaying ? <i class="material-icons">stop</i> : <i class="material-icons">play_arrow</i>}</button>
      <button id='controls' onClick={handleNext}><i class="material-icons">skip_next</i></button>
      <button id='controls'onClick={handleVolumeDown}><i class="material-icons">volume_down</i></button>
    <button id='controls'onClick={handleVolumeUp}><i class="material-icons">volume_up</i></button> 
    <button id='controls'onClick={onInfoToggle}><i class="material-icons">info</i></button>
    </div>
  );
}

export default Controls;