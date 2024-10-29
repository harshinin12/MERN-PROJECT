import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import PlaceDetail from './components/PlaceDetail';
import PlaceList from './components/PlaceList';
import Booking from './components/Booking';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listings" element={<PlaceList/>} />
        <Route path="/listings/:id" element={<PlaceDetail/>} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
