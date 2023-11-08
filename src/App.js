import { FaHome, FaUser } from 'react-icons/fa';
import './App.css';
import NewBill from './Components/NewBill/NewBill';
import HomePageTiles from './Components/HomePageLinkTiles/HomePageTiles';

import newBillImage from './images/newbill.png'
import ordersSymbol from './images/orders.png'

function App() {
  return (
    <div className="App">
      <div className="header">
        <FaHome size={32} color='white' className='homeicon'/>
        <h2 className='pagelabel'>Home</h2>
        <FaUser size={32} color='white' className='usericon'/>
      </div>
      <NewBill />
      <div className='optiontiles'>
        <HomePageTiles name='New Bill' image = {newBillImage} />
        <HomePageTiles name='Orders' image = {ordersSymbol} />
      </div>
    </div>
  );
}

export default App;
