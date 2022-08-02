import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Read100 from './pages/Read100';
import MyPage from './pages/MyPage';
import { CircularProgress, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();
  const { isLoading, currentUser } = useSelector((state) => state.user);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F7971C',
        contrastText: '#fff',
      },
      secondary: {
        main: '#807d78',
        contrastText: '#fff',
      },
      disabled: {
        main: '#ebe8e2',
      },
    },
  });

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

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Stack alignItems="center" justifyContent="center" height="100vh">
          <CircularProgress size={150} color="primary" />
        </Stack>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />}></Route>
        <Route path="/read100" element={currentUser ? <Read100 /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />}></Route>
        <Route path="/mypage" element={currentUser ? <MyPage /> : <Navigate to="/login" />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
