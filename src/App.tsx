import { useState , lazy, Suspense, ComponentType, } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

// dynamic import ()
const LazyProfile:React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/user-profile/Profile'))
const LazyHome:React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/home/Home'))
const LazyCreatePosts:React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/create-posts/Createpost'))
const LazyFindFriends:React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/find-friends/FindFriends'))
const LazySign:React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/SignUp'));
const LazyIntro: React.LazyExoticComponent<ComponentType<any>> = lazy(()=>import('./pages/intro-page/Intro'))

const App: React.FC = () => {
  
  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
      
        <Routes>
          <Route path='/' element={
          <Suspense fallback={<div>Loading...</div>}>
            <LazyIntro/>
          </Suspense>
          }/>
          <Route path='/home' element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyHome/>
            </Suspense>
          
          } />
          {/* <Route path='/login' element={<Login/>}/> */}
          <Route path='/createpost' element={
             <Suspense fallback={<div>Loading...</div>}>
              <LazyCreatePosts/>
            </Suspense>
          }/>
          <Route path='/findfriends' element={
             <Suspense fallback={<div>Loading...</div>}>
              <LazyFindFriends/>
            </Suspense>
          }/>
          <Route path='/profile' element={
             <Suspense fallback={<div>Loading...</div>}>
              <LazyProfile/>
            </Suspense>
          }/>
          <Route path='/signup' element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazySign/>
            </Suspense>
          }/>
          <Route path='*' element={'PAGE NOT FOUND'}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App
