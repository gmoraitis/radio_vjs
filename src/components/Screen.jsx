import React, { useState, useEffect, useRef } from 'react';
import Clock from './Clock.jsx';
import Frequency from './Frequency.jsx';
import Controls from './Controls.jsx';

function Screen({onInfoToggle}) {
  const [stations, setStations] = useState(null); // Initialize as null
  const [filteredStations, setFilteredStations] = useState([]);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentVolume , setCurrentVolume] = useState(0.35);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://de1.api.radio-browser.info/json/stations/bycountry/Greece');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Process stations immediately after fetching
        const filtered = data.filter(station => station.state === "Athens");
        const processed = [];

        filtered.forEach(station => {
          const frequencyMatch = station.name.match(/\b\d+\.\d{1}\b/);
          if (frequencyMatch) {
            const newStation = {
              name: station.name.trim().toLowerCase(),
              url: station.url,
              frequency: parseFloat(frequencyMatch[0]),
              favicon: station.favicon,
            };

            const isDuplicate = processed.some(s => s.frequency === newStation.frequency);
            if (!isDuplicate) {
              processed.push(newStation);
            }
          }
        });

        setFilteredStations(processed.sort((a, b) => a.frequency - b.frequency));
        console.log("Available stations:", processed.sort((a, b) => a.frequency - b.frequency));
        setStations(data);
      } catch (err) {
        console.error("Failed to fetch stations:", err);
      } finally {
        setLoading(false); // Assuming you have a loading state (removed for brevity)
      }
    };

    fetchData();
  }, []); // Empty dependency array

  const handleStationChange = (index) => {
    setCurrentStationIndex(index);
    if (isPlaying) {
      audioRef.current.play(); // Auto play if already playing
    } else {
      audioRef.current.pause(); // Ensure audio is paused if switching stations while stopped
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

const handleVolumeUp = () => {
    if (audioRef.current) {
      setCurrentVolume(currentVolume + 0.1);
      audioRef.current.volume = currentVolume;
    }
  }

const handleVolumeDown = () => {
    if (audioRef.current) {
        setCurrentVolume(currentVolume - 0.1);
        audioRef.current.volume = currentVolume;
    }
}



  useEffect(() => {
    if (filteredStations.length > 0 && audioRef.current) {
      audioRef.current.src = filteredStations[currentStationIndex].url;
      if (isPlaying) {
        audioRef.current.play(); // Play automatically if switching stations while playing
      } else {
        audioRef.current.pause(); // Ensure audio is paused if switching stations while stopped
      }
    }
  }, [filteredStations, currentStationIndex, isPlaying]);

  return (
    <div>
      {filteredStations.length > 0 ? ( // Render only if stations are fetched
        <>
        <Clock />
          <Frequency
            stations={filteredStations}
            currentStationIndex={currentStationIndex}
            onStationChange={handleStationChange}
          />

          <audio ref={audioRef} />
          <Controls
            stations={filteredStations}
            currentStationIndex={currentStationIndex}
            onStationChange={handleStationChange}
            onPlay={handlePlay}
            onStop={handleStop}
            onVolumeUp={handleVolumeUp}
            onVolumeDown={handleVolumeDown}
            isPlaying={isPlaying}
            onInfoToggle={onInfoToggle}
          />
        </>
      ) : (
        <div>Loading stations...</div>
      )}
    </div>
  );
}

export default Screen;