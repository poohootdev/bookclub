import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import Header from '../components/Header';
import '../firebase';
import { ref, getDatabase, update } from 'firebase/database';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { setUserDetail } from '../store/userDetailReducer';

function Challenge() {
  const dispatch = useDispatch();

  const { user, userDetail } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  let items = [];
  for (let i = 1; i <= 100; i++) {
    items.push(i);
  }

  const itemsList = items.map((value) => (
    <Grid key={value} item textAlign="center">
      <CheckCircleIcon sx={{ mt: -1 }} color="disabled" />
    </Grid>
  ));

  const handleClick = useCallback(async () => {
    setLoading(true);
    const updates = {};
    updates['/users/' + user.currentUser.uid + '/eventChallenge/count'] =
      userDetail.currentUserDetail.eventChallenge.count - 1;
    updates['/users/' + user.currentUser.uid + '/eventChallenge/start'] = true;
    await update(ref(getDatabase()), updates);

    dispatch(
      setUserDetail({
        eventChallenge: { count: userDetail.currentUserDetail.eventChallenge.count - 1, start: true },
      }),
    );
  }, [dispatch, user.currentUser.uid, userDetail.currentUserDetail.eventChallenge.count]);

  if (userDetail.currentUserDetail.eventChallenge.start === true) {
    return (
      <Container component="main">
        <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
          <Header />
        </Box>
        <Box sx={{ mt: 10 }}>
          <Grid container rowSpacing={1}>
            {itemsList}
          </Grid>
        </Box>
        <Link to="/challengeinsert">
          <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 20, right: 20 }}>
            <AddIcon />
          </Fab>
        </Link>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
        <Header />
      </Box>
      <Box sx={{ mt: 10 }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia component="img" height="200" image="/images/con_brand01_4_slide-1-3.png" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              웅진북클럽 100권 읽기 운동
            </Typography>
            <Typography variant="body2" color="secondary">
              <b>100권 읽기 운동</b>으로 아이들의 꿈, 갖고 싶은 선물 등 다양한 동기를 부여하여 목표에 도달해 보세요!
            </Typography>
            <br />
            <Typography variant="body2" color="secondary">
              <b>규칙</b>
            </Typography>
            <Typography variant="body2" color="secondary">
              - 매일 하루 독서한 사진과 내용을 꼭 올려야 헤요.
            </Typography>
            <Typography variant="body2" color="secondary">
              - 독서 100권 도전 기회는 총 3번까지 가능헤요.
            </Typography>
          </CardContent>
        </Card>
        <LoadingButton
          onClick={handleClick}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={userDetail.currentUserDetail.eventChallenge.count === 0}
          loading={loading}
        >
          도전 시작( {userDetail.currentUserDetail.eventChallenge.count}/
          {userDetail.currentUserDetail.eventChallenge.countMax} )
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default Challenge;
