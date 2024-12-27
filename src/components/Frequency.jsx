function Frequency({ stations }) {
  return (
    <div>
      <h2>Radio Stations</h2>
      <ul>
        {stations.map((station) => {

            if (station.state === 'Athens') {
                return (
                    <li key={station.id}>
                        {station.name} - {station.url}
                    </li>
                )
            }
            return null
        }
        )}
        </ul>
    </div>
    );
}


export default Frequency;