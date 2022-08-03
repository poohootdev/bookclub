import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ChallengesListItem from '../components/ChallengesListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import '../firebase';
import { get, child, ref, getDatabase } from 'firebase/database';

function Challenge() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const snapShot = await get(child(ref(getDatabase()), 'challenges'));
      setData(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
          <Header />
        </Box>
        <Box sx={{ mt: 10 }}>
          <Card sx={{ maxWidth: 400, mb: 3 }}>
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
          {data.map((item) => (
            <ChallengesListItem
              key={item.timestamp}
              uid={item.uid}
              timestamp={item.timestamp}
              image={item.image}
              description={item.description}
            />
          ))}
        </Box>
      </Container>
      <Link to="/challengeinsert">
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}

export default Challenge;
