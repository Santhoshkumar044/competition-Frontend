

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import HomePage from "./pages/HomePage";
import H from "./pages/H";
import UserDashboard from './pages/UserDashboard';
import ProfilePage from "./pages/ProfilePage";
import CreateEvent from "./pages/CreateEvent";
import EventForm from "./pages/EventForm";
import CreateCompetition from "./pages/CreateCompetition";
import EditCompetition from "./pages/EditCompetition";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TemplatePage from "./pages/Template";
export default function App() {
  return (
    <Router>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/host-dashboard" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-competition" element={<CreateCompetition />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-competition/:id" element={<EditCompetition />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/home" element={<H />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template" element={<TemplatePage />} />
        
      </Routes>
    </Router>
  );
}
