import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Alert, Box, Container, Grid, TextField, Typography, Button } from '@mui/material';
import '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = useCallback(async (email, password) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
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
    },
    [loginUser],
  );

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
        <Card sx={{ mt: 3, width: 400 }}>
          <CardMedia component="img" height="252" image="/images/con_brand01_4_slide-1-3.png" />
        </Card>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            name="email"
            required
            fullWidth
            label="이메일"
            autoComplete="off"
            autoFocus
            placeholder="example@gmail.com"
          />
          <TextField
            margin="normal"
            name="password"
            required
            fullWidth
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
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
              <Link to="/join" style={{ textDecoration: 'none' }}>
                <Button variant="text" size="large" color="secondary">
                  📋 회원가입
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
