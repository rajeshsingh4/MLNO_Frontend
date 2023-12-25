import axios from "axios";

const PULL_REQUEST_URL = `${process.env.REACT_APP_URL}/api/pull-request/`;

const getPullRequest = () => {
  return axios.get(PULL_REQUEST_URL + "all");
};

const getPullRequestById = (pullReqId) => {
    return axios.get(PULL_REQUEST_URL + pullReqId);
};

const createPullRequest = (data) => {
    return axios.post(PULL_REQUEST_URL, data);
};

const FlieMasterListService = {
    getPullRequest,
    getPullRequestById,
    createPullRequest
};

export default FlieMasterListService;
