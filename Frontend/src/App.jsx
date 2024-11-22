import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import TipsAndSuggestions from "./pages/TipsAndSuggestions";
import Food_Management from "./pages/Food_Management";
import Test from "./pages/Test";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DividedLogin from "./pages/DividedLogin";
import GetMeals from "./pages/GetMeals";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import DonationCenter from "./pages/DonationCenter";
import NgoProfile from "./pages/NgoProfile";

export default function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const entityType = currentUser?.entity;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <DividedLogin />
            </ProtectedRoute>
          }
        />

        {/* Routes for Providers */}
        {entityType === "PROVIDER" && (
          <Route element={<PrivateRoute allowedEntities={["PROVIDER"]} />}>
            <Route path="provider/analytics" element={<Analytics />} />
            <Route path="provider/profile" element={<Profile />} />
            <Route
              path="provider/tipsandsuggestions"
              element={<TipsAndSuggestions />}
            />
            <Route
              path="provider/food_management"
              element={<Food_Management />}
            />
            <Route path="provider/" element={<Test />} />
            <Route
              path="provider/donation-center"
              element={<DonationCenter />}
            />
          </Route>
        )}

        {/* Routes for NGOs */}
        {entityType === "NGO" && (
          <Route element={<PrivateRoute allowedEntities={["NGO"]} />}>
            <Route path="/ngo/getMeals" element={<GetMeals />} />
            <Route path="/ngo/profile" element={<NgoProfile />} />
          </Route>
        )}
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}
