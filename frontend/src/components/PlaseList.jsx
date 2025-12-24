import React, { useEffect, useState } from "react";
import PlaceListItem from "../components/PlaseListItem.jsx";
import { fetchPlacesApi } from "../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Spinner from "./layouts/Spinner.jsx";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

export default function PlaceList() {
  const [places, setPlaces] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const updatePlaceInList = (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === updatedPlace.id ? updatedPlace : place
      )
    );
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const data = await fetchPlacesApi(token);
        setPlaces(data.data);
        // setPlaces(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch places.");
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces()
    listenToThePlaceEvents()
  },[]);

  const listenToThePlaceEvents = () => {
    // setup laravel echo here
    window.Pusher = Pusher
    const echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      // host: window.location.hostname + ":6001",
      wsHost: "localhost",
      wsPort: 8080,
      cluster: "mt1",
      forceTLS: false,
      disableStats: true,
      authEndpoint: import.meta.env.VITE_PUSHER_AUTH_URL,
      auth: { headers: {
        Authorization: `Bearer ${token}`,
      }, },
    });
    echo.private("places").listen('.placeUpdated', (event) => {
      const updatedPlace = event.place;
      updatePlaceInList(updatedPlace);
      toast.info(`Place "${updatedPlace.name}" has been updated.`);
    })
  }

  return (
    <div>
      <div className="row my-4">
        {/* TODO: remove the Spinner in the end Project becuse we have alredy in App in Suspense */}
        {loading ? (
          <Spinner />
        ) : (
          <PlaceListItem
            updatedPlaceInList={updatePlaceInList}
            places={places}
          />
        )}
      </div>
    </div>
  );
}
