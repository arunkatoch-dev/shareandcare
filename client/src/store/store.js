import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homepageSlice from "../slices/homepageSlice";
import authSlice from "../slices/authSlice";
import userProfileSlice from "../slices/userProfileSlice";

const reducer = combineReducers({
  homepageSlice,
  authSlice,
  userProfileSlice,
});

const store = configureStore({ reducer });
export default store;
