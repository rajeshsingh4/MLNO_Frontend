import axios from "axios";
import authHeader from './auth-header';

const PULL_REQUEST_URL = `${process.env.REACT_APP_URL}/api/pull-request/`;

const getPullRequest = () => {
  return axios.get(PULL_REQUEST_URL + "all", { headers: authHeader() });
};

const getPullRequestById = (pullReqId) => {
    return axios.get(PULL_REQUEST_URL + pullReqId, { headers: authHeader() });
};

const createPullRequest = (data) => {
    return axios.post(PULL_REQUEST_URL, data, { headers: authHeader() });
};

const FlieMasterListService = {
    getPullRequest,
    getPullRequestById,
    createPullRequest
};

export default FlieMasterListService;
