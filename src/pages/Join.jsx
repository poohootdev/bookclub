import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userReducer';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Container, Grid, TextField, Typography, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { set, ref, getDatabase } from 'firebase/database';
import md5 from 'md5';

function Join() {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const postUserData = useCallback(
    async (email, password, name, realName, realChildName) => {
      setLoading(true);

      try {
        const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
        await updateProfile(user, {
          displayName: name,
          photoURL: `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`,
        });

        await set(ref(getDatabase(), 'users/' + user.uid), {
          name: user.displayName,
          avatar: user.photoURL,
          realName: realName,
          realChildName: realChildName,
          eventChallenge: {
            start: false,
            count: 3,
            countMax: 3,
          },
        });

        dispatch(setUser(user));
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const name = data.get('name');
      const password = data.get('password');
      const passwordConfirm = data.get('passwordConfirm');
      const realName = data.get('realName');
      const realChildName = data.get('realChildName');

      if (typeof email !== 'string') return;
      if (typeof password !== 'string') return;
      if (typeof passwordConfirm !== 'string') return;
      if (typeof name !== 'string') return;
      if (typeof realName !== 'string') return;
      if (typeof realChildName !== 'string') return;

      if (!email || !name || !password || !passwordConfirm || !realName || !realChildName) {
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

      postUserData(email, password, name, realName, realChildName);
    },
    [postUserData],
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
          📋
        </Typography>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Card sx={{ mt: 3, width: 400 }}>
          <CardMedia component="img" height="252" image="/images/con_brand01_4_slide-1-3.png" />
        </Card>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <p>[필수] 계정 정보</p>
              <TextField
                name="email"
                required
                fullWidth
                label="이메일"
                autoComplete="off"
                autoFocus
                placeholder="example@gmail.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                required
                fullWidth
                label="비밀번호"
                type="password"
                placeholder="6글자이상 입력해 주세요."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passwordConfirm"
                required
                fullWidth
                label="비밀번호 확인"
                type="password"
                placeholder="6글자이상 입력해 주세요."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="닉네임"
                autoComplete="off"
                placeholder="망고엄마"
                helperText="게시물에 표시되는 나의 별명으로, 자유롭게 입력해 주세요."
              />
            </Grid>

            <Grid item xs={12}>
              <p>[필수] 기본 정보 (실제 이름으로 입력해 주세요.)</p>
              <TextField name="realName" required fullWidth label="본인 이름" autoComplete="off" placeholder="차범근" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="realChildName"
                required
                fullWidth
                label="자녀 이름"
                autoComplete="off"
                placeholder="차두리"
              />
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
                <Button variant="text" size="large" color="secondary">
                  🔒 로그인
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Join;
