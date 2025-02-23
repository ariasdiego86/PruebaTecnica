import { api } from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Obtiene la URL desde .env.local

console.log("APi url  " + API_URL);

export const login = async (email: string, password: string) => {

    console.log(`Haciendo login en: ${API_URL}/auth/login`);
    const response = await api.post(`${API_URL}/auth/login`, {email, password});
    return response.data;

}

export const register = async (name: string, email: string, password: string) => {

    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
    
};