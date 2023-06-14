import axios from "axios";

const axiosService = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const fetcher = (url: string) => {
  axiosService.get(url).then((res) => res.data);
};

export { fetcher, axiosService };
