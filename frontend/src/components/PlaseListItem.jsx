import React from "react";
import { handlePlaceRequest  , reservePlaceApi , startParkingApi , endParkingApi ,cancelReservationApi} from "../config/api";
import { useSelector } from "react-redux";




export default function PlaceListItem({ places, updatedPlaceInList }) {

  const { token ,user } = useSelector((state) => state.user);

  const findReservationByStatus = ( status ,reservations) => {
      const reservation = reservations.find((res) => res.user_id === user.id && res.status === status);
      return reservation;
  }
  const rendersButtons = (place) => {
    const { status, reservations } = place;
    // const reservation = reservations.find(
    //   (res) => res.user_id === 1 && res.status === "reserved"
    // );
    // const reservationParked = reservations.find(
    //   (res) => res.user_id === 1 && res.status === "parked"
    // );

    if (!place) return null;
    switch (status) {
      case "available":
        return (
          <>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => handlePlaceRequest(() => reservePlaceApi(place.id , token), updatedPlaceInList)}
            >
              Reserve
            </button>
          </>
        );
      case "reserved":
        return (
          <>
            <button className="btn btn-sm btn-primary"
              onClick={() => handlePlaceRequest(() => startParkingApi(findReservationByStatus('reserved' ,reservations).id, token), updatedPlaceInList)}>
              Park hier
              </button>

            <button
              className="btn btn-sm btn-warning"
              onClick={() => handlePlaceRequest(() => cancelReservationApi(findReservationByStatus('reserved' ,reservations).id, token), updatedPlaceInList)}
            >
              Cancel
            </button>
          </>
        );
      case "occupied":
        return (
          <>
            <button className="btn btn-sm btn-danger" onClick={() => handlePlaceRequest(() => endParkingApi(findReservationByStatus('parked' ,reservations).id, token), updatedPlaceInList)}>
              End parking
              </button>
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
                <span
                  className={`badge ${place.status == "available" ? "bg-success" : place.status == "reserved" ? "bg-danger text-dark" : "bg-danger"} float-end`}
                >
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
