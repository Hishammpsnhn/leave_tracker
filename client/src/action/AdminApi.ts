import type { EmpDetails } from "../types/employee";
import apiClient from "./apiClient";

export const CreateEmployee_API = async (empDetails: EmpDetails) => {
  try {
    const { data } = await apiClient.post(`/admin/users`, empDetails);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetEmployee_API = async (query:string) => {
  try {
    const { data } = await apiClient.get(`/admin/users`,{
       params: { role: query } 
    });
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetDashboard_API = async () => {

  try {
    const { data } = await apiClient.get(`/admin/dashboard`)
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
