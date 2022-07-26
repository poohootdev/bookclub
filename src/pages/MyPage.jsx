import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Stack, IconButton, Box, Container, Grid, Avatar, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import '../firebase';
import { signOut, getAuth } from 'firebase/auth';
import ProfileModal from '../components/modal/ProfileModal';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MyPage() {
  const { user, userDetail } = useSelector((state) => state);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleClickOpen = useCallback(() => {
    setShowProfileModal(true);
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);

  return (
    <>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <ArrowBackIcon sx={{ mt: 2, ml: 2, fontSize: 40 }} color="primary" />
      </Link>

      <Stack alignItems="center" spacing={1}>
        <Typography component="h1" variant="h5">
          내 정보
        </Typography>
        <IconButton onClick={handleClickOpen} color="primary">
          <Badge
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<PhotoCameraIcon sx={{ width: 50, height: 50 }} />}
          >
            <Avatar sx={{ width: 150, height: 150 }} alt="profileImage" src={user.currentUser?.photoURL} />
          </Badge>
        </IconButton>
      </Stack>
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom component="div">
            계정 정보
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography>이메일</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{user.currentUser?.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>닉네임</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography> {user.currentUser?.displayName}</Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom component="div" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography>본인 이름</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{userDetail.currentUserDetail.realName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>자녀 이름</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{userDetail.currentUserDetail.realChildName}</Typography>
            </Grid>
          </Grid>

          <LoadingButton onClick={handleLogout} fullWidth size="large" variant="contained" sx={{ mt: 7, mb: 2 }}>
            로그아웃
          </LoadingButton>
        </Box>
        <ProfileModal open={showProfileModal} handleClose={handleCloseProfileModal} />
      </Container>
    </>
  );
}

export default MyPage;
