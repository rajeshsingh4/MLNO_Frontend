import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/cardtrack/";

const getCardTrackingList = () => {
  return axios.get(API_URL + "all");
};

const CardTrackingService = {
  getCardTrackingList
};

export default CardTrackingService;
