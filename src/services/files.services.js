import axios from "axios";
// import authHeader from "./auth-header";

const FILE_URL = `${process.env.REACT_APP_URL}/api/fileList/`;

const getFileMasterList = () => {
  return axios.get(FILE_URL + "all");
};

const getFileMasterListByFileId = (fileId) => {
    return axios.get(FILE_URL + fileId);
  };

const FlieMasterListService = {
    getFileMasterList,
    getFileMasterListByFileId
};

export default FlieMasterListService;
