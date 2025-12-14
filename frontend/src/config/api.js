
import { toast } from 'react-toastify';
import axios from 'axios';


const  API_BASE_URL = 'http://localhost:8000/api';

export const handlePlaceRequest = async (requestFn , updatePlaceInList) => {
 try {
      const res = await requestFn()
      // check for errors in the response
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        updatePlaceInList(res.data.place);
        toast.success(res.data.message);
      }

    } catch (error) {
      if (error?.response?.status === 404) {
        toast.error("Resveration not found or not available.");
      }
      console.error("Error reserving place:", error);
      toast.error("Something went wrong while reserving the place.");
    }
}

// API calls

export const reservePlaceApi =  (placeId) =>  axios.post(`${API_BASE_URL}/book/reservation`, { place_id: placeId });

export const startParkingApi = (reservation) =>  axios.put(`${API_BASE_URL}/start/${reservation}/parking`, {});

export const endParkingApi = (reservation) =>  axios.put(`${API_BASE_URL}/end/${reservation}/parking`, {});

export const cancelReservationApi = (reservation) =>  axios.put(`${API_BASE_URL}/cancel/${reservation}/reservation`, {});

export  const getPlacesApi =  () =>  axios.get(`${API_BASE_URL}/places`);
