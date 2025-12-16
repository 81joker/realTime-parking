import React, { useEffect, useState } from "react";
import PlaceListItem from "../components/PlaseListItem.jsx";
import {  fetchPlacesApi } from "../config/api";
import { toast } from "react-toastify";

export default function PlaceList() {
  const [places, setPlaces] = useState([]);

  const updatePlaceInList = (updatedPlace) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === updatedPlace.id ? updatedPlace : place
      )
    );
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await fetchPlacesApi();
        setPlaces(data.data);
        // setPlaces(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch places.");
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);


  return (
    <div>
      {/* <pre>{JSON.stringify(places, null, 2)}</pre> */}
      <div className="row my-4">
        <h1>XXXXXXXXXXXXXXXXXXXXXXXXXXXXX</h1>
        <PlaceListItem 
        updatedPlaceInList={updatePlaceInList}
        places={places} />
      </div>
    </div>
  );
}
