import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/locationForm";
import LowerModal from "./components/lowerModal";
import MapComponent from "./components/mapComponent";

let map;
function App() {
  const [UserLocation, setUserLocation] = useState({ lat: 8, lng: 2 });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [mapError, setMapError] = useState("");

  useEffect(() => {
    getUserLocation();
    initMap();
  }, []);

  function initMap() {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: UserLocation.lat, lng: UserLocation.lng },
      zoom: 12,
    });
  }

  const getUserLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        setUserLocationInState,
        (e) => setMapError(e.message)
      );
    } else {
      alert("your browser does not have support for geolocation");
      setMapError("your browser does not have support for geolocation");
    }
  };

  const createMarker = ({ lat, lng }, icon) => {
    new window.google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: "current position",
      icon,
    });
  };

  const createPolyline = (path) => {
    console.log(path);
    const polyline = new window.google.maps.Polyline({
      strokeColor: "#0000FF",
      strokeOpacity: 0.4,
      map,
      path,
    });
  };

  function setMapCentre({ lat, lng }) {
    map.setCenter({ lat, lng });
  }

  const setUserLocationInState = (e) => {
    const lat = parseFloat(e.coords.latitude);
    const lng = parseFloat(e.coords.longitude);

    setUserLocation({ lat, lng });
    setMapCentre({ lat, lng });
    createMarker({ lat, lng });
  };

  const click = () => setMapCentre({ lat: 12, lng: 6 });
  return (
    <div className="App">
      <div className="app-body  mt-3">
        <h2 onClick={click} className="m-0">
          Parcel Request
        </h2>
        <Form
          UserLocation={UserLocation}
          mapError={mapError}
          setMapCentre={setMapCentre}
          setInfoModalOpen={setInfoModalOpen}
          createMarker={createMarker}
          createPolyline={createPolyline}
        />
        <MapComponent UserLocation={UserLocation} />
        <LowerModal UserLocation={UserLocation} infoModalOpen={infoModalOpen} />
      </div>
      <span id="place"></span>
    </div>
  );
}

export default App;
