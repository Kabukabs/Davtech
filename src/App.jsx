import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ContactUs } from './pages/contact';
import { Project } from './pages/projects';
import { Careers } from './pages/careers';
import { AboutUs } from './pages/aboutUs';
import { PageLayout } from './components/layout';
import { Home } from './pages/home';

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route element={<PageLayout/>}>
              <Route path="/" element={ < Home />}/>
              <Route path="/projects" element={<Project/>}/>
              <Route path="/careers" element={ <Careers/>}/>
              <Route path="/about us" element={ <AboutUs/>}/>
              <Route path="/contact us" element={ <ContactUs/>}/>
            </Route>
            {/* <Route path="/" element={ <Auth />}/> */}
          </Routes>
      </Router>
    </>
  )
}

export default App