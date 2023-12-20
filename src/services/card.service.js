import axios from "axios";
// import authHeader from "./auth-header";

const CARD_URL = `${process.env.REACT_APP_URL}/api/cardtrack/`;

const getCardTrackingList = () => {
  return axios.get(CARD_URL + "all");
};

const updateCardTrackingList = (id, data) => {
  return axios.put(CARD_URL + id, data);
};

const getAllCardsWithFileDeatils = () => {
  return axios.get(CARD_URL + 'all?fileList=true');
};

const CardTrackingService = {
  getCardTrackingList,
  updateCardTrackingList,
  getAllCardsWithFileDeatils
};

export default CardTrackingService;
