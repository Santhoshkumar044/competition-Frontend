import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import H from "./pages/H";
import UserDashboard from './pages/UserDashboard';
import ProfilePage from "./pages/ProfilePage";
import CreateEvent from "./pages/CreateEvent";
import EventForm from "./pages/EventForm";
import CreateCompetition from "./pages/CreateCompetition";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard"
import EventManagementApp from "./pages/Template"
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/host-dashboard" element={<AdminDashboard />}/>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<H />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-competition" element={<CreateCompetition />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template" element={<EventManagementApp />} />
        
        </Routes>
    </Router>
  );
}
