import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Container, Grid, TextField, Typography } from '@mui/material';
import '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (typeof email !== 'string') return;
    if (typeof password !== 'string') return;

    if (!email || !password) {
      setError('모든 항목을 입력해 주세요.');
      return;
    }

    loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography component="h1" variant="h5">
          🔒
        </Typography>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField margin="normal" name="email" required fullWidth label="이메일" autoComplete="off" autoFocus />
          <TextField margin="normal" name="password" required fullWidth label="비밀번호" type="password" />
          {error ? (
            <Alert sx={{ mt: 3 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            로그인
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/join" style={{ textDecoration: 'none', color: 'blue' }}>
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
