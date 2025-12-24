import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { checkPamentSuccessApi } from "../../config/api";

export default function Success() {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const processPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const paymentIntentId = queryParams.get("session_id");
        const reservationId = queryParams.get("reservation");

        const data = await checkPamentSuccessApi(
          {
            session_id: paymentIntentId,
            reservation_id: reservationId,
          },
          token
        );
        if (data.error) {
          setStatus(data.error);
        } else {
          setStatus(data.message);
        }
      } catch (error) {
        setStatus(`Payment Failed: ${error.message}`);
        console.log(error);
      }
    };
    processPayment();
  }, []);
  // }, [location, token]);

  return (
    <div className="row mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="alert alert-success text-center">{status}</div>
      </div>
    </div>
  );
}
