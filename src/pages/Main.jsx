import { Container, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
        <Header />
      </Box>
      <Box sx={{ mt: 10 }}>
        <Link to="/challenge" style={{ textDecoration: 'none' }}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia component="img" height="200" image="/images/con_brand01_4_slide-1-3.png" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                웅진북클럽 100권 읽기 운동
              </Typography>
              <Typography variant="body2" color="secondary">
                <b>100권 읽기 운동</b>으로 아이들의 꿈, 갖고 싶은 선물 등 다양한 동기를 부여하여 목표에 도달해 보세요!
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Box>
    </Container>
  );
}

export default Main;
