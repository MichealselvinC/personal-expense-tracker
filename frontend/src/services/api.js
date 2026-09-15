import axios from "axios"

const API = axios.create({
    baseURL: "https://personal-expense-tracker-1-i7n8.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
})

API.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("access_token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)


export default API