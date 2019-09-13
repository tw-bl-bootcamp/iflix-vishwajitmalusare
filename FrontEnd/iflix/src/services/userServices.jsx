import axios from "axios";
var baseURL = "http://localhost:8082"

export function userLogin(data) {
    return axios.post(baseURL + "/iflix/login",data);
}