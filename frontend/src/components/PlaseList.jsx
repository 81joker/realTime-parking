import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceListItem from "../components/PlaseListItem.jsx";
import { handlePlaceRequest  , getPlacesApi} from "../config/api";

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
        const response = await getPlacesApi();
        setPlaces(response.data.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);


  return (
    <div>
      {/* <pre>{JSON.stringify(places, null, 2)}</pre> */}
      <div className="row my-4">
        <PlaceListItem 
        updatedPlaceInList={updatePlaceInList}
        places={places} />
      </div>
    </div>
  );
}
