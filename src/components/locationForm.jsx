import { useState, useEffect } from "react";
import AutoCompleteComponent from "./autoCompleteComponent";
import blueMarker from "../assets/blueMarker.png";
import redMarker from "../assets/roundMarker-1.jpg";

const Form = ({
  UserLocation,
  setMapCentre,
  setInfoModalOpen,
  createMarker,
  createPolyline,
}) => {
  const bound = {
    north: UserLocation.lat + 0.5,
    south: UserLocation.lat - 0.5,
    east: UserLocation.lng + 0.5,
    west: UserLocation.lng - 0.5,
  };

  const serviceOptions = {
    types: ["establishment"],
    componentRestrictions: { country: ["NG"] },
    bounds: bound,
    strictBounds: true,
  };

  const service = new window.google.maps.places.AutocompleteService();

  const [autocomplete, setAutoComplete] = useState({
    Pickup: [],
    dropoff: [],
  });

  const [rideDetails, setRideDetails] = useState({
    Pickup: "",
    dropoff: "",
  });

  const [rideLatlng, setRideLatlng] = useState({
    Pickup: {},
    dropoff: {},
  });

  const clearAutocomplete = () => {
    setAutoComplete({ Pickup: [], dropoff: [] });
  };

  const initAutoComplete = (e) => {
    service.getQueryPredictions(
      { input: e.target?.value, ...serviceOptions },
      (Suggestions) => {
        clearAutocomplete();
        setAutoComplete({ ...autocomplete, [e.target.id]: Suggestions });
      }
    );
  };

  const displayOnmap = (place, type) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lat();
    let markerImg;
    if (type === "dropoff") {
      markerImg = blueMarker;
      setRideLatlng({ ...rideLatlng, dropoff: { lat, lng } });
      createPolyline([rideLatlng.Pickup, { lat, lng }]);
      setInfoModalOpen(true);
    } else {
      markerImg = redMarker;
      setRideLatlng({ ...rideLatlng, Pickup: { lat, lng } });
    }

    createMarker({ lat, lng }, markerImg);
    setMapCentre({ lat, lng });
  };

  const PickupSelected = (autocompleteItem) => {
    setRideDetails({ ...rideDetails, Pickup: autocompleteItem.description });
    document.getElementById("Pickup").value = autocompleteItem.description;
    const place = new window.google.maps.places.PlacesService(
      document.getElementById("place")
    );
    place.getDetails({ placeId: autocompleteItem.place_id }, (place) =>
      displayOnmap(place, "pickup")
    );
    clearAutocomplete();
  };

  const dropoffSelected = (autocompleteItem) => {
    console.log(autocompleteItem);
    setRideDetails({ ...rideDetails, dropoff: autocompleteItem.description });
    document.getElementById("dropoff").value = autocompleteItem.description;
    const place = new window.google.maps.places.PlacesService(
      document.getElementById("place")
    );
    place.getDetails({ placeId: autocompleteItem.place_id }, (place) =>
      displayOnmap(place, "dropoff")
    );
    clearAutocomplete();
  };

  return (
    <div className="form-container m-2">
      <form>
        <div className="input-cont">
          <input
            onFocus={clearAutocomplete}
            onChange={initAutoComplete}
            placeholder="Pickup address"
            id="Pickup"
          />
          <AutoCompleteComponent
            autocompleteClicked={PickupSelected}
            autocomplete={autocomplete.Pickup}
          />
        </div>

        <div>
          <input
            onFocus={clearAutocomplete}
            onChange={initAutoComplete}
            placeholder="dropoff address"
            id="dropoff"
          />
          <AutoCompleteComponent
            autocompleteClicked={dropoffSelected}
            autocomplete={autocomplete.dropoff}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
