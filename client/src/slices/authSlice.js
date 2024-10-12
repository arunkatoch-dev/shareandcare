// /* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL, frontendURL } from "../../constants";

const initialState = {
  loginStatus: false,
  isLoggingInLoading: false,
  isLoginStatusError: false,
  isSignUpPending: false,
  isLoginPending: false,
  isLoginError: false,
  isLogoutError: false,
  isLogoutPending: false,
  userEmail: "",
  profilePhoto: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  User Registration (SignUp)
    builder.addCase(registerUser.pending, (state) => {
      state.isSignUpPending = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isSignUpPending = false;
      const { msg, details } = action.payload;
      if (msg === "success") {
        window.alert(`SignUp Successfull`);
        window.location.href = `${frontendURL}/login`;
      }
      if (msg === "failed") {
        window.alert(`Registeration failed`, details);
      }
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isSignUpPending = false;
      window.alert("some error occured");
    });

    // Login User ------- >>>>>>>>>
    builder.addCase(userLogin.pending, (state) => {
      state.isLoggingInLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoggingInLoading = false;
      const { msg, details } = action.payload;
      if (msg === "success") {
        state.loginStatus = true;
        window.location.href = `${frontendURL}/`;
      }
      if (msg === "failed") {
        return window.alert(details);
      }
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLoggingInLoading = false;
      window.alert("oops some error occured.");
    });

    //  track user login status
    builder.addCase(checkUserLoginStatus.pending, (state) => {
      state.isLoginPending = true;
    });
    builder.addCase(checkUserLoginStatus.fulfilled, (state, action) => {
      if (action.payload.msg === "user not authenticated") {
        state.isLoginPending = false;
        state.loginStatus = false;
        window.location.href = `${frontendURL}/login`;
      }
      if (action.payload.msg === "verified user") {
        const { userName, profilePhoto, email } = action.payload.user;
        state.isLoginPending = false;
        state.loginStatus = true;
        state.profilePhoto = profilePhoto;
        state.userEmail = email;
        localStorage.setItem("userName", userName);
        localStorage.setItem("profilePhoto", profilePhoto);
        localStorage.setItem("userEmail", email);
      }
    });

    builder.addCase(checkUserLoginStatus.rejected, (state) => {
      state.isLoginPending = false;
      state.isLoginStatusError = true;
      console.error("can't get login status. some error occured.");
    });

    //    Logout User
    builder.addCase(userLogout.pending, (state) => {
      state.isLogoutPending = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      if (action.payload.msg === "logged out") {
        state.loginStatus = false;
        state.isLogoutPending = false;
        localStorage.removeItem("userName");
        localStorage.removeItem("profilePhoto");
        localStorage.removeItem("userEmail");
        window.location.href = `${frontendURL}/login`;
      }
      if (action.payload.msg === "error") {
        state.loginStatus = true;
        state.isLogoutPending = false;
        alert("failed to logut student...");
      }
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.isLogoutError = true;
      state.isLogoutPending = false;
      alert("failed to logout");
      console.error("some error occured while logging out.");
    });
  },
});

export const userLoginViaGoogle = createAsyncThunk(
  "userLoginViaGoogle",
  async () => {
    const userLoginViaGoogle = await axios.get(`${backendURL}/auth/google`);
    return await userLoginViaGoogle.data;
  }
);

// User Sign In --- >>>>>>
export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ email, password }) => {
    const userLogin = await axios.post(
      `${backendURL}/login`,
      { email, password },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await userLogin.data;
  }
);

// User  SignUp  ---->>>>>
export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, password, userName }) => {
    const registerUser = await axios.post(
      `${backendURL}/register`,
      { email, password, userName },
      {
        credentials: "include",
        withCredentials: true,
      }
    );
    return await registerUser.data;
  }
);

// track login status
export const checkUserLoginStatus = createAsyncThunk(
  "checkUserLoginStatus",
  async () => {
    const checkUserLoginStatus = await axios.get(`${backendURL}/`, {
      credentials: "include",
      withCredentials: true,
    });
    return await checkUserLoginStatus.data;
  }
);

// User logout
export const userLogout = createAsyncThunk("studentLogout", async () => {
  const userLogout = await axios.get(`${backendURL}/logout`, {
    credentials: "include",
    withCredentials: true,
  });
  return await userLogout.data;
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
