import * as Yup from "yup";

const passwordRedExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let SignupValidationSchema = Yup.object({
  email: Yup.string().email("Please type a valid email").required("Required"),
  userName: Yup.string()
    .min(3, "min 3 chars")
    .max(15, "max 15 chars allowed.")
    .required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(8, "min 8 chars allowed")
    .max(15, "max 15 chars allowed")
    .matches(
      passwordRedExp,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export default SignupValidationSchema;
