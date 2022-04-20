import './App.css';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import Details from './components/Details.jsx';
import CreatePokemon from './components/Create.jsx';
import Update from './components/Update'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/create' element={<CreatePokemon/>} />
        <Route path='/update/:id' element={<Update/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
