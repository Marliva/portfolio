import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ADMIN_ROUTES } from '@/config/admin'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

import PrivateRoute from './components/admin/PrivateRoute'
import AdminLayout from './components/admin/AdminLayout'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Messages from './pages/admin/Messages'
import AdminProjects from './pages/admin/Projects'
import AdminSkills from './pages/admin/Skills'
import AdminAbout from './pages/admin/About'

function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path={ADMIN_ROUTES.login} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ADMIN_ROUTES.dashboard} element={<Dashboard />} />
            <Route path={ADMIN_ROUTES.messages} element={<Messages />} />
            <Route path={ADMIN_ROUTES.projects} element={<AdminProjects />} />
            <Route path={ADMIN_ROUTES.skills} element={<AdminSkills />} />
            <Route path={ADMIN_ROUTES.about} element={<AdminAbout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App