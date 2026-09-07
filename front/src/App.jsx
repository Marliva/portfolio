import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
    </div>
  )
}

export default App