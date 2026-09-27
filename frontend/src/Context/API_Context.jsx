import React, { createContext } from "react";
import api from "../utils/api";


export const ApiContext = createContext();



export function ApiProvider({ children }) {


    const registerUser = async (userData) => {

        try {

            const response = await api.post("/", userData);


            return response.data;


        } catch (error) {


            console.log(error.response?.data || error.message);


            throw error;

        }

    };

    const loginUser = async (data) => {
        const response = await api.post("/login/", data);
        return response.data;
    };

    const forgotPassword = async (data) => {
        const response = await api.post("/forgot-password/", data);
        return response.data;
    };

    const resetPassword = async (data) => {
        const response = await api.post("/reset-password/", data);
        return response.data;
    };

    return (
        <ApiContext.Provider value={{ registerUser, loginUser, forgotPassword, resetPassword }}>
            {children}
        </ApiContext.Provider>
    );

}