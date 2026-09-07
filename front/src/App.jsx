import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App