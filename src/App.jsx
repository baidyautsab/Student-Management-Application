import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ViewStudent from './components/ViewStudent';


const App = () => {
  return (
    <div className='main'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/viewdetails' element={<ViewStudent/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App