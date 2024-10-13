/* eslint-disable react-refresh/only-export-components */
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import store from "./store/store.js";
import SpinnerCircularLoader from "./components/loaders/SpinnerCircularLoader.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
const QuestionsNavMenu = lazy(() =>
  import("./pages/QuestionsNavMenu/QuestionsNavMenu.jsx")
);
const PostsNavMenu = lazy(() =>
  import("./pages/PostsNavMenu/PostsNavMenu.jsx")
);
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup/Signup.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/questions"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <QuestionsNavMenu />
          </Suspense>
        }
      />
      <Route
        path="/posts"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <PostsNavMenu />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/userprofile"
        element={
          <Suspense fallback={<SpinnerCircularLoader />}>
            <UserProfile />
          </Suspense>
        }
      />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
