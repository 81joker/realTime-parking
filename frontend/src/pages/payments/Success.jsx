import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { checkPamentSuccessApi } from "../../config/api";

export default function Success() {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();
  const [status, setStatus] = useState("processing...");
  const [message, setMessage] = useState("Processing...");
  const alertType  = status === 'error' ? 'danger' : status ==='success' ? 'success' : 'info';


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
          setStatus('error')
          setMessage(data.error);
        } else {
          setStatus('success')
          setMessage(data.message);
        }
      } catch (error) {
        setStatus('error')
        setStatus(`Payment Failed: ${error.message}`);
        console.log(error);
      }
    };
    processPayment();
  }, [location, token]);
  // }, [location, token]);

  return (
    <div className="row mt-5">
      <div className="col-md-6 offset-md-3">
        <div className={`alert alert-${alertType} text-center`}>{message}</div>
      </div>
    </div>
  );
}
