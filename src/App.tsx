import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login';
import { Home } from './pages/home/Home';
import {Navbar} from "./components/Navbar";
import {Createpost} from "./pages/create-posts/Createpost"


function App() {
  

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
          <Route path='*' element={'PAGE NOT FOUND'}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
