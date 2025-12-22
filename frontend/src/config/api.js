import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
// const API_BASE_URL = "http://localhost:8000/api";
// const PRODUCTION_API_BASE_URL = "https://realtimepark.nehaddev.com/api";

const getConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  return config;
}
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api"
    : "https://realtimepark.nehaddev.com/api";


export const handlePlaceRequest = async (requestFn, updatePlaceInList) => {
  try {

    const res = await requestFn();
    // check for errors in the response
    if (res.data.error) {

      toast.error(res.data.error)

    } else if (res.data.paymentError && res.data.payment_url) {
       
      Swal.fire({
        title: res.data.paymentError,
        icon: "info",
        html: `
          You can pay it from,
         <b><a href="${res.data.payment_url}" autofocus>links</a></b>,
        `,
        showCloseButton: true,
        showConfirmButton: false,
      });

    } else {
      updatePlaceInList(res.data.place);
      toast.success(res.data.message);
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error("Resveration not found or not available.");
    }
    console.log(error);
    
    console.error("Error reserving place:", error);
    toast.error("Something went wrong while reserving the place.");
  }
};

// Fetch all places
export const fetchPlacesApi = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places`, getConfig(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

// Register new user
export const registerUserApi = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/user/register`, userData);
  return res.data;
};

// Login user
export const loginUserApi = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/user/login`, userData);
  return res.data;
};


// Logout user
export const logoutUserApi = async (token) => {
  const res = await axios.post(`${API_BASE_URL}/user/logout`, {}, getConfig(token));
  return res.data;
}

// Get logged in user
export const getLoggedInUserApi = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/user`, getConfig(token));
  return res.data;
}

// API calls
export const reservePlaceApi = (placeId, token) =>
  axios.post(`${API_BASE_URL}/book/reservation`, { place_id: placeId }, getConfig(token));

export const startParkingApi = (reservation, token) =>
  axios.put(`${API_BASE_URL}/start/${reservation}/parking`, {}, getConfig(token));

export const endParkingApi = (reservation, token) =>
  axios.put(`${API_BASE_URL}/end/${reservation}/parking`, {}, getConfig(token));

export const cancelReservationApi = (reservation, token) =>
  axios.put(`${API_BASE_URL}/cancel/${reservation}/reservation`, {}, getConfig(token));
export const getPlacesApi = () => axios.get(`${API_BASE_URL}/places`);
