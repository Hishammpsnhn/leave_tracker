import apiClient from "./apiClient";

export const login_API = async (email: string,password:string) => {
  try {
    const { data } = await apiClient.post(`/auth/login`, {
      email,
      password
    });
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
