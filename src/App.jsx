import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactUs } from './pages/contact';
import { Project } from './pages/projects';
import { Careers } from './pages/careers';
import { AboutUs } from './pages/aboutUs';
import { PageLayout } from './components/layout';
import { Home } from './pages/home';
import SkillCollab from './components/CareerForms/form1';
import MentorAdvisor from './components/CareerForms/form2';
import Thankyou from './components/CareerForms/Thankyou';
import { Dashboard } from './pages/dashboard';
import { AddProject } from './pages/addProject';
import { AppContextProvider } from './lib/context/app.context';
import { AuthProvider } from './lib/context/auth.context';  // Import AuthProvider
import ProtectedRoute1 from './ProtectedRoute';  // Adjusted path
import Login from './components/dashboard/Login';
import LoginAddProject from './pages/LoginAddProject';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
        <AppContextProvider>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Project />} />
              <Route
                path="/projects/add"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />
              <Route path="/careers" element={<Careers />} />
              <Route path="/skill-collab" element={<SkillCollab />} />
              <Route path="/mentor-advisor" element={<MentorAdvisor />} />
              <Route path="/thank-you" element={<Thankyou />} />
              <Route path="/about us" element={<AboutUs />} />
              <Route path="/contact us" element={<ContactUs />} />
              <Route 
                path="/projects/dashboard" 
                element={
                  <ProtectedRoute1>
                    <Dashboard />
                  </ProtectedRoute1>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/loginAddProject" element={<LoginAddProject />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
