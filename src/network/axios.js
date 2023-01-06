import * as coreAxios from "axios";
import { config } from "../config";

// Apis of new server
export const axios = coreAxios.default.create({
  baseURL: config.customerPortal,
});

const token = JSON.parse(localStorage.getItem("authUser")) || "";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJJZCI6IlVJRDEwIiwiaWQiOiI2MzUyN2E1NTU1ZGZjN2E4MDc5YTVlNGUiLCJyb2xlIjoiYWRtaW4iLCJtYWluQWRkcmVzcyI6Ik1BQ0hTIHNvY2lldHkiLCJzaGlwcGluZ0luZm8iOlt7Il9pZCI6IjYzYjZjYWE1YmU2NjQ2NzVjYjcwZDE5MCIsIm5hbWUiOiJQZXJzb24gMSIsInBob25lTnVtYmVyIjoiMTY4MTY1MTE2OCIsImFkZHJlc3MiOiJOYXptaW1hZCJ9LHsiX2lkIjoiNjNiNmNhYTViZTY2NDY3NWNiNzBkMTkxIiwibmFtZSI6IlBlcnNvbiAyIiwiYWRkcmVzcyI6IlNhZGRhciIsInBob25lTnVtYmVyIjoiMTYxNjUxODYxNjEifSx7Il9pZCI6IjYzYjZjYWE1YmU2NjQ2NzVjYjcwZDE5MiIsIm5hbWUiOiJhZG1pbiIsInBob25lTnVtYmVyIjoiMDkwMDc4NjAxIiwiYWRkcmVzcyI6Ik1BQ0hTIHNvY2lldHkifV0sInBob25lTnVtYmVyIjoiMDkwMDc4NjAxIiwiaWF0IjoxNjcyOTIzODE0LCJleHAiOjE2NzMwMDY2MTR9.rWyeQ82iZtFtqrrwR7vUmtD0DZBQmuztuPZh_yj-fO8";

axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

axios.interceptors.response.use(
  async (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const { response } = error;
    let toastMessage = `Something went wrong! Please contact support team`;
    if (response) {
      const { status, data } = response;
      if (status === 400) {
        toastMessage = data.message;
      } else if (status === 401) {
        toastMessage = data.message;
      }
    }
    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return await axios
    .get(url, config)
    .then((response) => response)
    .catch((exp) => exp);
}

export async function post(url, data, config = {}) {
  return axios
    .post(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((exp) => exp);
}

export async function postFormData(url, data, config = {}) {
  return axios
    .postForm(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((exp) => exp);
}

export async function put(url, data, config = {}) {
  return axios
    .put(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((exp) => exp);
}

export async function del(url, config = {}) {
  return await axios
    .delete(url, { ...config })
    .then((response) => response.data)
    .catch((exp) => exp);
}
