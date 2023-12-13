import axios from "axios";
// import authHeader from "./auth-header";

const FILE_URL = `${process.env.REACT_APP_URL}/api/fileList/`;
const BUREAU_URL = `${process.env.REACT_APP_URL}/api/bureauTAT/`;

const getFileMasterList = () => {
  return axios.get(FILE_URL + "all");
};

const getFileMasterListByFileId = (fileId) => {
    return axios.get(FILE_URL + fileId);
  };

const getBureauTAT = () => {
  return axios.get(BUREAU_URL + "all");
}

const FlieMasterListService = {
    getFileMasterList,
    getFileMasterListByFileId,
    getBureauTAT
};

export default FlieMasterListService;
