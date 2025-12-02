import React from "react";

export default function PlaceListItem(places) {
  const rendersButtons = (status) => {
    switch (status) {
      case "available":
        return (
          <>
            <button className="btn btn-sm btn-dark">Reseve</button>
            {/* <button className="btn btn-sm btn-primary">Park hier</button> */}
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
      {places?.places.map((place) => (
        <div key={place.id} className="col-md-4">
          <div className="card custom-card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                {place.place_number}
                <span className="badge bg-success float-end">
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
                {rendersButtons(place.status)}
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
