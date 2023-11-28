import axios from "axios";
// import authHeader from "./auth-header";

const AUDIT_LOG_URL = `${process.env.REACT_APP_URL}/api/auditlog/`;

const getAuditLogsList = () => {
  return axios.get(AUDIT_LOG_URL + "all");
};

const getCardAuditLogList = (id) => {
  return axios.get(`${AUDIT_LOG_URL}card/${id}`);
};

const CardTrackingService = {
    getAuditLogsList,
    getCardAuditLogList
};

export default CardTrackingService;
