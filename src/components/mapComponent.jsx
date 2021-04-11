const Map = ({ mapError }) => {
  return (
    <div className="map-container">
      {mapError ? <span className="map-error">{mapError}</span> : null}
      <div id="map"></div>
    </div>
  );
};

export default Map;
