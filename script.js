const apiEndpoint = "https://de1.api.radio-browser.info/json/stations/bycountry/Greece";
const frequencyDisplay = document.getElementById("frequency"); // Areas to show station name
const player = document.getElementById("player"); // Audio tag
const defaultInfo = document.getElementById("defaultInfo"); // Add information about the project
const stations = []; // Global array for all Greek stations
const myStations = [];  // Initialize an empty array to store filtered station objects
let currentStationIndex = 0; // An index
let currentVolume = 0.35; // Initial volume


/**
 * Fetches all Greek radio stations from the API.
 * @returns {Promise<Array<object>|null>} A promise that resolves to an array of station objects, or null if an error occurs.
 */
// Construction of getGreekStations
async function getGreekStations() {

    try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;  // Return the parsed JSON data
    
    } catch (error) {
        console.error("Failed to fetch stations:", error);
        return null;
    }
}

/**
 * Updates the UI to display the current station's information and play its audio stream.
 * - Uses the global currentStationIndex to determine the station to play.
 * - Uses the global myStations array.
*/
// Construction of updateStation
function updateStation() {
    const station = myStations[currentStationIndex];
    player.src = station.url;
    player.play();
    player.volume = currentVolume;
    frequencyDisplay.innerText = `${station.frequency} MHz`;
}


/** Main Function --
 * - Calls the getGreekStations() and UpdateStation()
 * - Creates the final object that holds the stations after processing and filtering
*/
async function init() {
    try {
        // Fetch stations
        const stationsData = await getGreekStations();

        if (stationsData) {
            console.log("Available stations:", stationsData);

            // Process and filter stations for Athens
            stationsData.forEach(station => {
                if (station.state === "Athens") {
                    const frequencyMatch = station.name.match(/\b\d+\.\d{1}\b/);

                    if (frequencyMatch) {
                        const newStation = {
                            name: station.name.trim().toLowerCase(),
                            url: station.url,
                            frequency: parseFloat(frequencyMatch[0]),
                            favicon: station.favicon,
                        };

                        // Avoid duplicates
                        const isDuplicate = myStations.some(s => s.frequency === newStation.frequency);
                        if (!isDuplicate) {
                            myStations.push(newStation);
                        }
                    }
                }
            });

            // Sort stations by frequency
            myStations.sort((a, b) => a.frequency - b.frequency);
            console.log("Stations with frequency in Athens:", myStations);

            // Update UI
            updateStation();  // Show the first station
        } else {
            console.error("No station data found.");
            frequencyDisplay.innerText = "No stations found";
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}


// Event listeners for navigation buttons
document.getElementById("prev").addEventListener("click", () => {
    currentStationIndex = (currentStationIndex - 1 + myStations.length) % myStations.length;
    updateStation();
    console.log(myStations[currentStationIndex].name); // Correct logging
});

document.getElementById("next").addEventListener("click", () => {
    currentStationIndex = (currentStationIndex + 1) % myStations.length; // Use myStations.length
    updateStation();
});

document.getElementById("play").addEventListener("click", () => {
    player.play();
}
);


document.getElementById("stop").addEventListener("click", () => {
    player.pause();
    player.currentTime = 0;
}   
);

document.getElementById("volume-up").addEventListener("click", () => {
    if (currentVolume < 1) {
        currentVolume = Math.min(currentVolume + 0.05, 1); // Increment volume, cap at 1
        player.volume = currentVolume;
        console.log(`Volume increased to: ${(currentVolume * 100).toFixed(0)}%`);
    }

}   
);

document.getElementById("volume-down").addEventListener("click", () => {
    if (currentVolume > 0) {
        currentVolume = Math.max(currentVolume - 0.05, 0); // Decrement volume, floor at 0
        player.volume = currentVolume;
        console.log(`Volume decreased to: ${(currentVolume * 100).toFixed(0)}%`);
    }

}   
); 

document.getElementById("info-icon").addEventListener("click", () => {
    if (defaultInfo.style.display === 'block') {
        defaultInfo.style.display = 'none'; // Hide the default info
        info.style.display = 'block'; // Show the volume message
    }
    else {
        defaultInfo.style.display = 'block'; // Show the default info
        info.style.display = 'none'; // Hide the volume message
    }
}
);
    



// Add keyboard controls (Arrowleft: <-- , Arrowright: --> , Arrowup: ^ , Arrowdown: v ) 
document.addEventListener("keydown", (event) => {
    const key = event.key; // Get the key pressed

    switch (key) {
        case "ArrowLeft": // Navigate to the previous station
            if (myStations.length === 0) {
                console.error("No stations available for navigation.");
                return;
            }
            currentStationIndex = (currentStationIndex - 1 + myStations.length) % myStations.length;
            updateStation();
            break;

        case "ArrowRight": // Navigate to the next station
            if (myStations.length === 0) {
                console.error("No stations available for navigation.");
                return;
            }
            currentStationIndex = (currentStationIndex + 1) % myStations.length;
            updateStation();
            break;

        case "ArrowUp": // Increase volume
            if (currentVolume < 1) {
                currentVolume = Math.min(currentVolume + 0.01, 1); // Increment volume, cap at 1
                player.volume = currentVolume;
                console.log(`Volume increased to: ${(currentVolume * 100).toFixed(0)}%`);
            }
            break;

        case "ArrowDown": // Decrease volume
            if (currentVolume > 0) {
                currentVolume = Math.max(currentVolume - 0.01, 0); // Decrement volume, floor at 0
                player.volume = currentVolume;
                console.log(`Volume decreased to: ${(currentVolume * 100).toFixed(0)}%`);
            }
            break;

        default:
            // Ignore other keys
            break;
    }
});


// Start the app
init();


// add the clock to the page
// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion
function showTime() {
    // Getting current time and date
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;

    let currentTime = hour + ":" + min

    // Displaying the time
    document.getElementById("clock").innerHTML = currentTime;
}

showTime(); // Call the function to display the time immediately



