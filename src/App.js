import { FaHome, FaUser } from 'react-icons/fa';
import './App.css';
import NewBill from './Components/NewBill/NewBill';
function App() {
  return (
    <div className="App">
      <div className="header">
        <FaHome size={32} color='white' className='homeicon'/>
        <h2 className='pagelabel'>Home</h2>
        <FaUser size={32} color='white' className='usericon'/>
      </div>
      <NewBill />
    </div>
  );
}

export default App;
