import * as Yup from "yup";

// emp validation
export const employeeValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  joiningDate: Yup.date().required("Joining Date is required"),
  profile: Yup.string().url("Invalid image URL format").nullable(),
});
