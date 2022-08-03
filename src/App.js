import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Join from './pages/Join';
import Challenge from './pages/Challenge';
import ChallengeInsert from './pages/ChallengeInsert';
import MyPage from './pages/MyPage';
import { CircularProgress, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../src/firebase';
import { get, child, ref, getDatabase } from 'firebase/database';
import { setUserDetail, clearUserDetail } from './store/userDetailReducer';

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

  const getMyInfo = useCallback(
    async (uid) => {
      const snapShot = await get(child(ref(getDatabase()), 'users/' + uid));

      dispatch(
        setUserDetail({
          realName: snapShot.val().realName,
          realChildName: snapShot.val().realChildName,
          eventChallenge: snapShot.val().eventChallenge,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUser(user));
        getMyInfo(user.uid);
      } else {
        dispatch(clearUser());
        dispatch(clearUserDetail());
      }
    });
    return () => unsubscribe();
  }, [dispatch, getMyInfo]);

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
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />}></Route>

        <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />}></Route>
        <Route path="/mypage" element={currentUser ? <MyPage /> : <Navigate to="/login" />}></Route>
        <Route path="/challenge" element={currentUser ? <Challenge /> : <Navigate to="/login" />}></Route>
        <Route path="/challengeinsert" element={currentUser ? <ChallengeInsert /> : <Navigate to="/login" />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
