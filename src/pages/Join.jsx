import { LoadingButton } from '@mui/lab';
import { Alert, Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';
import md5 from 'md5';
import { Link } from 'react-router-dom';

function Join() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const name = data.get('name');
    const password = data.get('password');
    const passwordConfirm = data.get('passwordConfirm');

    if (typeof email !== 'string') return;
    if (typeof name !== 'string') return;
    if (typeof password !== 'string') return;
    if (typeof passwordConfirm !== 'string') return;

    if (!email || !name || !password || !passwordConfirm) {
      setError('모든 항목을 입력해 주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 같지 않습니다.');
      return;
    }

    if (password.length < 6 || passwordConfirm.length < 6) {
      setError('비밀번호는 6글자 이상이어야 합니다.');
      return;
    }

    postUserData(email, name, password);
  };

  const postUserData = async (email, name, password) => {
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
      await updateProfile(user, {
        displayName: name,
        photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
      });

      await set(ref(getDatabase(), 'users/' + user.uid), { name: user.displayName, avatar: user.photoURL });
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
          📋 회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="email" required fullWidth label="이메일" autoComplete="off" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField name="name" required fullWidth label="이름" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="비밀번호" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="passwordConfirm" required fullWidth label="비밀번호 확인" type="password" />
            </Grid>
          </Grid>
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
            회원가입
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
                로그인으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Join;
