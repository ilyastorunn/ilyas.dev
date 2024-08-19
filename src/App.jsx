import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Mind from './Pages/Mind'
import Projects from './Pages/Projects'
import Skills from './Pages/Skills'
import Piano from './Components/Piano'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/mind' element={<Mind />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
