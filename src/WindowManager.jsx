import React, { useState } from 'react'
import './App.css'
import NewBill from './Components/NewBill/NewBill';
import HomePageTiles from './Components/HomePageLinkTiles/HomePageTiles';

import newBillImage from './images/newbill.png'
import ordersSymbol from './images/orders.png'
import Orders from './Components/Orders/Orders';

function WindowManager() {
  const [window,setWindow] = useState(0);
  const [orders , setOrders] = useState();
  var win;
  switch (window) {
    
    case 1:
        win = (
            <NewBill orders = {orders}/>
        );
        break;
        
    case 2:
      win = (
        <Orders setWindow = {setWindow} setOrders = {setOrders} />
      );
      break;
    default:
        break;
        
  }

  return (
    <div>
        {win}
        <div className='optiontiles'>
                <div onClick={()=>setWindow(1)}><HomePageTiles name='New Bill' image = {newBillImage} /></div>
                <div onClick={()=>setWindow(2)}><HomePageTiles name='Orders' image = {ordersSymbol} /></div>
    </div>
    </div> 
  )
}

export default WindowManager