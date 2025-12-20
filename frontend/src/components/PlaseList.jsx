import React, { useEffect, useState } from "react";
import PlaceListItem from "../components/PlaseListItem.jsx";
import { fetchPlacesApi } from "../config/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Spinner from "./layouts/Spinner.jsx";

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
    fetchPlaces();
  }, [token]);

  return (
    <div>
      <div className="row my-4">
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
