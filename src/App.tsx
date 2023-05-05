import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Profile} from './pages/user-profile/Profile'
import { Home } from './pages/home/Home';
import {Createpost} from "./pages/create-posts/Createpost"
import { FindFriends } from './pages/find-friends/FindFriends';
import { SignUp } from './pages/SignUp';
import {Intro} from './pages/intro-page/Intro';



function App() {
  
  


  
  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
      
        <Routes>
          <Route path='/' element={<Intro/>}/>
          <Route path='/home' element={<Home/>} />
          {/* <Route path='/login' element={<Login/>}/> */}
          <Route path='/createpost' element={<Createpost/>}/>
          <Route path='/findfriends' element={<FindFriends/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='*' element={'PAGE NOT FOUND'}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App
