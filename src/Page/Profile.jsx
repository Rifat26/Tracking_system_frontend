import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS for the map
import Header from "../Components/Header";
import { Button } from "antd";
import { useSendLocationMutation } from "../app/fetchers/location/locationApi";
import { useSelector } from "react-redux";

const App = () => {
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [sendAddress] = useSendLocationMutation();
  const user = useSelector((state) => state?.auth?.user.id);

  const myPosition = (position) => {
    const latitudeInfo = position.coords.latitude;
    const longitudeInfo = position.coords.longitude;

    setLatitude(latitudeInfo);
    setLongitude(longitudeInfo);
    setError(null);
    fetchAddress(latitudeInfo, longitudeInfo);
  };

  const handleError = (error) => {
    console.error("Geolocation error:", error);
    setError(
      "Access to your location is denied. Please enable location access to use this feature."
    );
  };

  const fetchAddress = async (lat, lng) => {
    try {
      // Using OpenStreetMap's Nominatim API to get the address based on coordinates
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      if (response?.status === 200) {
        const { country, country_code, state_district, state, town, county } =
          data.address;
        try {
          const address = {
            country,
            country_code,
            state_district,
            state,
            town,
            county,
          };
          const sendingToBackend = {
            address: address,
            longitude: lng, // Pass the value directly here
            latitude: lat, // Pass the value directly here
            user: user,
          };
          console.log(sendingToBackend);
          const res = await sendAddress(sendingToBackend);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }

      if (data.error) {
        setError("Unable to fetch address.");
      } else {
        setAddress(data.display_name); // Set the address
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      setError("Unable to fetch address. Please try again.");
    }
  };

  const handleGetLocation = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        setError(
          "Location access is blocked. Please enable it in your browser settings."
        );
      } else {
        navigator.geolocation.getCurrentPosition(myPosition, handleError);
      }
    } catch (err) {
      console.error("Error checking permissions:", err);
      setError("Unable to check location permissions. Please try again.");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      const map = L.map("map").setView([latitude, longitude], 18); // Set initial position

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      // Add marker for the user's location
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
    }
  }, [latitude, longitude]);

  return (
    <div>
      <Header />
      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>

      <div>
        <div className="mx-auto my-5 max-w-2xl rounded-xl px-6 py-8 text-gray-600 shadow-lg border">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Find Your Current Location
          </h2>
          <p className="mb-6 text-gray-500">
            Click the button below to get your current location. Make sure to
            allow location permissions in your browser for accurate results.
          </p>
          <Button
            onClick={handleGetLocation}
            type="dashed"
            size="large"
            className="w-full"
          >
            <span className="active"></span> Track My Location
          </Button>
        </div>
      </div>
      {address && <p className="text-gray-700 text-center pb-5">{address}</p>}
      {/* OpenStreetMap with Leaflet */}
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default App;
