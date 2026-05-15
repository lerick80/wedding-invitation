import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

    </Routes>
  );
}
``