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
        const response = await WebApi.get(`/User/${email}`, {
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

export const getSellers = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get(`/User/sellers`, {
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

export const approveSeller = async (email) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.post(`/User/verify/${email}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the caller
    }
};

export const rejectSeller = async (email) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.post(`/User/reject/${email}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the caller
    }
};


export const addItem = (inputs) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = WebApi.post("/Item/addItem", inputs, {
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

export const getItems = async () => {
    try {
        const response = await WebApi.get(`/Item/items`);
        return response;
    } catch (error) {
        // console.log(error);
    }
}

export const newOrder = (inputs) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = WebApi.post("/Order/newOrder", inputs, {
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

export const getOrderByCustomer = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get(`/Order/ordersByCustomer`, {
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

export const getOrderItems = async (orderId) => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get('/Order/orderedItems', {
            params: {
                orderId: orderId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // Handle error
    }
}

export const cancelOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    try {
        const response = await WebApi.delete(`/Order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response.data; // Return the response data after successful deletion
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

export const getOrders = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get('/Order/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // Handle error
    }
}

export const getDelivered = async () => {
    const sellerId = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get(`/Order/deliveredOrders/`, {
            params: {
                sellerId: sellerId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // Handle error
    }
}

export const getPending = async () => {
    const sellerId = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    try {
        const response = await WebApi.get(`/Order/pendingOrders/`, {
            params: {
                sellerId: sellerId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                UserType: userType,
            }
        });
        return response;
    } catch (error) {
        // Handle error
    }
}







