import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import Header from '../components/Header';
import '../firebase';
import { get, child, ref, getDatabase, update } from 'firebase/database';

function Main() {
  const { user } = useSelector((state) => state);

  const [challengeCount, setChallengeCount] = useState(0);
  const [challengeCountMax, setChallengeCountMax] = useState(0);
  const [challengeStart, setChallengeStart] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.currentUser) return;
    async function getChallengInfo() {
      const snapShot = await get(child(ref(getDatabase()), 'users/' + user.currentUser.uid));
      const challenge = snapShot.val().eventChallenge;
      setChallengeCount(challenge.count);
      setChallengeCountMax(challenge.countMax);
      setChallengeStart(challenge.start);
    }
    getChallengInfo();
  }, [user.currentUser]);

  const handleClick = useCallback(async () => {
    setLoading(true);

    const updates = {};
    updates['/users/' + user.currentUser.uid + '/eventChallenge/count'] = challengeCount - 1;
    updates['/users/' + user.currentUser.uid + '/eventChallenge/start'] = true;
    await update(ref(getDatabase()), updates);

    setChallengeCount(challengeCount - 1);
    setChallengeStart(true);
  }, [user.currentUser.uid, challengeCount]);

  if (challengeStart === true) {
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
          <Header />
        </Box>
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
          disabled={challengeCount === 0}
          loading={loading}
        >
          도전 시작( {challengeCount}/{challengeCountMax} )
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default Main;
