import React from "react";
import axios from "axios";
export default function PlaceListItem({ places, updatedPlaceInList }) {

  const resercvePlace = async (placeId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/book/reservation`
        , { place_id: placeId }
      );
      const updatedPlace = response.data.place;
      updatedPlaceInList(updatedPlace);
      console.log("Place reserved successfully:", response.data.message);

    } catch (error) {
      console.error("Error reserving place:", error);
    }
  }


  const rendersButtons = (place) => {
      if (!place) return null;
    switch (place.status) {
      case "available":
        return (
          <>
            <button className="btn btn-sm btn-dark" 
            onClick={() => resercvePlace(place.id)}>
              Reserve
              </button>
          </>
        );
      case "reserved":
        return (
          <>
            <button className="btn btn-sm btn-primary">Park hier</button>
            <button className="btn btn-sm btn-warning">Cancel</button>
          </>
        );
      case "occupied":
        return (
          <>
            <button className="btn btn-sm btn-danger">End parking</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {places?.map((place) => (
        <div key={place.id} className="col-md-4">
          <div className="card custom-card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                {place.place_number}
                <span className={`badge ${place.status == 'available' ? 'bg-success' : place.status == 'reserved' ? 'bg-danger text-dark' : 'bg-danger'} float-end`}>
                  {place.status}
                </span>
              </h5>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="card-text mb-1">
                    <strong>Sector:</strong> {place.sector.name}{" "}
                    {place.sector.description}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Price:</strong> {place.sector.price} / hour
                  </p>
                  {place.status === "available" ? (
                    <i className="bi bi-p-circle h1"></i>
                  ) : (
                    <i className="bi bi-sign-no-parking h1 text-danger"></i>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3">
                {rendersButtons(place)}
                {/* <button className="btn btn-sm btn-dark">Reseve</button>
                <button className="btn btn-sm btn-warning">Cancel</button>
                <button className="btn btn-sm btn-primary">Park hier</button>
                <button className="btn btn-sm btn-danger">End parking</button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
