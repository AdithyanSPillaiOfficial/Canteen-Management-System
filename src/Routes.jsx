// App.js or Routes.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './App'; // import your components
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'; // import the component for /placeorder

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaceOrder />}></Route>
        <Route path="/manage" element={<Home />}></Route>
        {/* Route for Guthub Pages Deployments*/}
        <Route path='/Canteen-Management-System' element={<PlaceOrder />}></Route> 
        <Route path='/Canteen-Management-System/manage' element={<Home />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
