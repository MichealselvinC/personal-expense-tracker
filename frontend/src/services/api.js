import axios from "axios";


const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


export const loginUser = async (email, password) => {
    const response = await API.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};


export const getDashboard = async (token) => {
    const response = await API.get("/dashboard/summary", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const createExpense = async (token, expense) => {
    const response = await API.post(
        "/expenses/",
        expense,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const getExpenses = async (token) => {
    const response = await API.get("/expenses/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};