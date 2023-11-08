import { FaHome, FaUser } from 'react-icons/fa';
import './App.css';
import WindowManager from './WindowManager';


function App() {
  return (
    <div className="App">
      <div className="header">
        <FaHome size={32} color='white' className='homeicon'/>
        <h2 className='pagelabel'>Home</h2>
        <FaUser size={32} color='white' className='usericon'/>
      </div>
      {/* <NewBill /> */}
      <WindowManager />
      
    </div>
  );
}

export default App;
