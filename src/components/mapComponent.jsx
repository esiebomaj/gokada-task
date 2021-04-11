const Map = ({ mapError }) => {
  return (
    <div className="map-container">
      {mapError ? <span className="map-error">{mapError}</span> : null}
      <div id="map" style={{ height: "75vh" }}></div>
    </div>
  );
};

export default Map;
