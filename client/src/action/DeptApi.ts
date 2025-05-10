import type { Department } from "../types/dept";
import apiClient from "./apiClient";

export const CreateDepartment_API = async (deptDetails: Department) => {
  try {
    const { data } = await apiClient.post(`/admin/dept`, deptDetails);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetDepartment_API = async () => {
  try {
    const { data } = await apiClient.get(`/admin/dept`);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
