import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />}></Route>
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />}></Route>
      <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />}></Route>
    </Routes>
  );
}

export default App;
