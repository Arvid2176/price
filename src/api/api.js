import axios from 'axios';

// let base = process.env.API_ROOT;
let base = "";

//企业相关
export const queryEntList = params => { return axios.get(`${base}/interface/usagePageList`, { params: params }).then(res => res.data); };
export const queryEntDetailList = params => { return axios.get(`${base}/interface/usageDetailList`, { params: params }).then(res => res.data); };
export const getEntListExcel =params=>{ return axios.get(`${base}/interface/usagePageListExcel`, { params: params }).then(res => res.data);};
//service 相关

