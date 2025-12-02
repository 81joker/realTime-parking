import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceListItem from "../components/PlaseListItem.jsx";
export default function PlaceList() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/places");
        setPlaces(response.data.data);
        console.log("Fetched places:", response.data);
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
        <PlaceListItem places={places} />
      </div>
    </div>
  );
}
