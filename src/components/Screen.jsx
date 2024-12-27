import React, { useEffect } from 'react';
import Clock from './Clock.jsx';
import { useState } from 'react';
import Frequency from './Frequency.jsx';

function Screen() {
    const [stations, setStations] = useState([])

    useEffect(() => {
        // save the async function in a variable
        const fetchData = async () => {
            const response = await fetch('https://de1.api.radio-browser.info/json/stations/bycountry/Greece')
            const data = await response.json()
            setStations(data)
        }
        // call the async function
        fetchData()
    }   
    , [])

  return (
    <div>
        <Frequency stations={stations} />
        <Clock />
    </div>
  );
}

export default Screen;