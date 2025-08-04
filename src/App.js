import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="users/:id" element={<User />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
