import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Signup from './components/Signup'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './components/Login'
import AddProject from './components/AddProject2'
import Contact from './components/Contact'
import Aboutus from './components/Aboutus'
import ViewProjects from './components/ViewProjects'
import Chat from './components/Chat'
import { ToastContainer } from 'react-toastify'
import AuthStates from './context/AuthStates'
import Profile from './components/Profile'
import AddOfficer from './components/AddOfficerMain'
import ProjectDetails from './components/ProjectDetails'
import CollaborationRequests from './components/CollaborationsRequests'
import SentCollaborationRequests from './components/SentRequests'
import Request from './components/Request'
import DashboardAnalytics from './components/DashboardAnalytics'
import ProjectApprovals from './components/ProjectApproval'
import ProjectTasks from './components/ProjectTasks'
export const backendUrl = process.env.REACT_APP_BACKEND_URL
export default function App() {
  console.log(backendUrl)
  return (
    <AuthStates>
    <div className='dark:bg-gray-900 bg-gradient-to-b from-blue-950/[.19] via-transparent'>
      <Router>
        <Navbar/>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Hero/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/AddProject' element={<AddProject/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/viewprojects' element={<ViewProjects/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addofficer' element={<AddOfficer/>}/>
          <Route path='/chat' element={<Chat />} />
          <Route path='/collaborationrequests' element={<CollaborationRequests/>}/>
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/sentCollaborationRequests" element={ <SentCollaborationRequests/>} />
          <Route path="/request" element={ <Request/>} />
          <Route path="/overview" element={<DashboardAnalytics/>} />
          <Route path="/viewpending" element={<ProjectApprovals/>} />
          <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} /> </Routes>
        <Footer/>
      </Router>
    </div>
    </AuthStates>
  )
}
