import axios from "axios";
// import authHeader from "./auth-header";

const CARD_URL = `${process.env.REACT_APP_URL}/api/cardtrack/`;

const getCardTrackingList = () => {
  return axios.get(CARD_URL + "all");
};

const CardTrackingService = {
  getCardTrackingList
};

export default CardTrackingService;
