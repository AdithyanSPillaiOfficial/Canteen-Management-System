import React, { useState } from 'react'
import './App.css'
import NewBill from './Components/NewBill/NewBill';
import HomePageTiles from './Components/HomePageLinkTiles/HomePageTiles';

import newBillImage from './images/newbill.png'
import ordersSymbol from './images/orders.png'

function WindowManager() {
  const [window,setWindow] = useState(0);
  var win;
  switch (window) {
    
    case 1:
        win = (
            <NewBill />
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
                <div onClick={()=>setWindow(0)}><HomePageTiles name='Orders' image = {ordersSymbol} /></div>
    </div>
    </div> 
  )
}

export default WindowManager