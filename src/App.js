import './App.css';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
