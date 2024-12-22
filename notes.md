

**1. Component Structure:**

* Break down your application logic into reusable React components. Here are some potential components:
    * `RadioApp`: This will be the main component encapsulating the entire application.
    * `Station`: This component will represent a single radio station with its name, frequency, URL, and logo.
    * `Player`: This component will handle audio playback and volume control.
    * `Controls`: This component will house the previous/next station buttons.

**2. Data Fetching with React Hooks:**

* Use the `useState` and `useEffect` hooks to manage the state of your application, including the list of stations and the currently playing station. 
* The `useEffect` hook can be used to fetch data from the API (similar to your `getGreekStations` function) when the component mounts.

**3. Rendering with JSX:**

* Use JSX syntax to define the structure of your components. 
* You can use React components within each other to build the final UI. For example, the `RadioApp` component might render a `Station` component to display the current station info, a `Player` component for playback, and `Controls` for navigation.

**4. Handling User Interactions:**

* Implement event handlers using React's built-in event system. For example, clicking on the "next" button in `Controls` might trigger a function that updates the `currentStationIndex` state and calls an update function (similar to `updateStation`).

**Example (DOM manipulation with React):**

Let's take the `Station` component as an example. Here's how you might render the station name and logo with React:

```jsx
function Station({ station }) {
  return (
    <div className="station">
      <img src={station.favicon} alt="Station Logo" />
      <h2>{station.name}</h2>
    </div>
  );
}
```

This code defines a `Station` component that takes a `station` object as a prop. Inside the component, it renders an image using the station's `favicon` URL and an `<h2>` element with the station's `name`.



### Ideas:

I want to make a test button that will fetch all the stations from the api and console log them


1. we need to create a button component first
```jsx
function TestButton({ onClick }) {
  return <button onClick={onClick}>Test Button to fecth stations</button>;
}

export default TestButton;
```

2. in the App component we must do the fetching, and pass the object in the button of course, but in general in whatever component we might use in the future rendering it in the App component .
```jsx
import './App.css'
import React, { useState, useEffect } from 'react';
import TestButton from './components/TestButton'; // Import the TestButton component

const apiEndpoint = "https://de1.api.radio-browser.info/json/stations/bycountry/Greece";

function App() {
  const [stations, setStations] = useState(null); // Initialize stations as null
  const [loading, setLoading] = useState(false); // Add a loading state
  const [error, setError] = useState(null);       // Add an error state

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

  useEffect(() => {
    // This will run when the component mounts if you want an initial fetch
    // You can remove this if you only want to fetch on button click
    // fetchStations();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleClick = () => {
    fetchStations();
  }

  if (loading) {
    return <div>Loading stations...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display an error message
  }

  return (
    <div>
      <h1>Radio App</h1>
      <TestButton onClick={handleClick} /> {/* Pass the function to the button */}
      {/* Conditionally render station data */}
      {stations && (
        <pre>{JSON.stringify(stations, null, 2)}</pre> // Pretty print the JSON
      )}
    </div>
  );
}

export default App;
```

As you can see the fetching logic is not living inside the useEffect as normally whould , and that is happening because we want (for now) to use a button(logic) to start the fetching procedure. The normal will be:

```jsx
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
```
And with that we just render the stations without any button interaction to start the fetching procedure. 
- In this part we moved the async function inside the useEffect and also we run the function fetchStations() inside the useEffect block.
- We deleted the button component and the event handler.