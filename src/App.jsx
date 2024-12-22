import './App.css'
import React, { useState, useEffect } from 'react';
import TestButton from './components/TestButton'; // Import the TestButton component

const apiEndpoint = "https://de1.api.radio-browser.info/json/stations/bycountry/Greece";

function App() {
  const [stations, setStations] = useState(null); // Initialize stations as null
  const [loading, setLoading] = useState(false); // Add a loading state
  const [error, setError] = useState(null);       // Add an error state



  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null);    // Clear any previous errors
  
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError(err); // Set the error state if there's an error
        console.error("Failed to fetch stations:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchStations(); // Call the async function. But why inside useEffect?
    // The useEffect hook is used to perform side effects in function components.
    // It is similar to componentDidMount and componentDidUpdate in class components.
    // The fetchStations function is an asynchronous operation that fetches the station data.
    // By calling it inside useEffect, we ensure that it runs after the component is mounted.
    // This is a common pattern for fetching data in function components.
    
  }, []); // Empty dependency array ensures this runs only once on mount



  if (loading) {
    return <div>Loading stations...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display an error message
  }

  return (
    <div>
      <h1>Radio App</h1>
      {/* Conditionally render station data */}
      {stations && (
        <pre>{JSON.stringify(stations, null, 2)}</pre> // Pretty print the JSON
      )}
    </div>
  );
}

export default App;