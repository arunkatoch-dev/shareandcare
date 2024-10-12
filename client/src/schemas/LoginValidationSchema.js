import * as Yup from "yup";

let LoginValidationSchema = Yup.object({
  userId: Yup.string().required("Required").min(3, "Invalid user Id or email"),
  password: Yup.string().required("Required"),
});

export default LoginValidationSchema;
