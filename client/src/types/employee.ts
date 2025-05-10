export interface EmpDetails {
  firstName: string;
  lastName: string;
  email: string;
  joiningDate: string;
  profile: File | null | string;
}
export interface EmpDetails {
  firstName: string;
  lastName: string;
  email: string;
  joiningDate: string;
  profile: string | null |File;
}

export interface EmployeeFormData extends EmpDetails {
  role: string;
  managerId: string;
  salary: string;
}

export interface Manager {
  id: string;
  name: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  joiningDate?: string;
  role?: string;
  managerId?: string;
  salary?: string;
}