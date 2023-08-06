import axios from "axios";

export const WebApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
});

export const loginUser = (inputs) => {
    try {
        const response = WebApi.post("/User/login", inputs);
        return response;
    } catch (error) {
        // console.log(error);
    }
}

export const registerUser = (inputs) => {
    try {
        const response = WebApi.post("/User/register", inputs);
        return response;
    } catch (error) {
        // console.log(error);
    }
}

export const updateUser = (inputs) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = WebApi.post("/User/update", inputs, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // console.log(error);
    }
}

export const getUser = async () => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response =await WebApi.get(`/User/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // console.log(error);
    }
}

export const changePassword = (inputs) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = WebApi.post("/User/passwordChange", inputs, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // console.log(error);
    }
}
