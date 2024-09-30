
import './App.css';
import GG from './components/GG';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Points from './screens/Points';
import Realestate from './components/Realestate';
import Stock from './screens/Stock';
function App() {
  return (
    <div className="App">
      <Router>

      
      <Routes>
        <Route path='/' element={<GG/>}/>
        <Route path='/investments' element={<Points/>}/>
        <Route path="/realestate" element={<Realestate/>}/>
        <Route path="/stock" element={<Stock/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
