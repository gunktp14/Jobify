import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute } from "./pages";
import {
  AllJob,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from "./pages/dashboard";
//styled-component recommended version is styled-components@5

//react-router-dom suggested version is react-router-dom@6

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
