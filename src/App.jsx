import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import HomePage from "./pages/HomePage";
import H from "./pages/H";
//import Login from "./pages/Login";
import UserDashboard from './pages/UserDashboard';
import ProfilePage from "./pages/ProfilePage";
import CreateEvent from "./pages/CreateEvent";
import EventForm from "./pages/EventForm";
import CreateCompetition from "./pages/CreateCompetition";
import Login from "./pages/Login";


export default function App() {
  return (
    <Router>
      <Routes>
        
        {/*<Route path="/" element={<UserDashboard />} />  */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<H />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-competition" element={<CreateCompetition />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}
