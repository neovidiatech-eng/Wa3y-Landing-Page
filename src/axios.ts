import axios from "axios";
export const api  = axios.create({
    baseURL: "https://api.waaiacademy.com/subscription/",
    headers: {
        "Content-Type": "application/json",
    },
});
  