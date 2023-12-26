import axios from "axios";
import authHeader from "./auth-header";

const PULL_REQUEST_LOG_URL = `${process.env.REACT_APP_URL}/api/pullrequestlog/`;

const getPullRequestLogsList = () => {
  return axios.get(PULL_REQUEST_LOG_URL + "all", { headers: authHeader() });
};

const getPullRequestLogsListByCardId = (cardId) => {
  return axios.get(`${PULL_REQUEST_LOG_URL}all?cardId=${cardId}`, { headers: authHeader() });
};

const getPullRequestLogById = (id) => {
  return axios.get(`${PULL_REQUEST_LOG_URL}card/${id}`, { headers: authHeader() });
};

const AuditLogService = {
    getPullRequestLogsList,
    getPullRequestLogById,
    getPullRequestLogsListByCardId
};

export default AuditLogService;
