// is the component that will dsplay the radio station data.
// the radio station data will be fetched from the API and stored in the stations state, that will be lived 
// in the App component.
// We must pass the stations data to the Station component as a prop.
//

function Station({ station }) {
    return (
        <div>
        <h2>{station.name}</h2>
        <p>Country: {station.country}</p>
        <p>URL: {station.url}</p>
        </div>
    );
    }

export default Station;