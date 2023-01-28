import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login';
import { Home } from './pages/home/Home';
import {Navbar} from "./components/Navbar";
import {Createpost} from "./pages/create-posts/Createpost"
import { FindFriends } from './pages/find-friends/findfriends';
import { SignUp } from './pages/SignUp';



function App() {
  

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
          <Route path='/findfriends' element={<FindFriends/>}/>
    
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={'PAGE NOT FOUND'}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
