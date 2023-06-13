import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import RootLayout from "../RootLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login/" element={<SignIn />}/>
      <Route path="/register/" element={<SignUp />}/>
      <Route path="/" element={
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Home />}/>
        <Route path="/profile/" element={<Profile />}/>
      </Route>

      <Route path="*" element={<NotFound />}/>
    </Route>
  )
);

export default router;
