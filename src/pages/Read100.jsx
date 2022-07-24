import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import Read100ListItem from '../components/Read100ListItem';

function Read100() {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
        <Header title="100권 읽기" />
      </Box>
      <Box sx={{ mt: 10 }}>
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
        <Read100ListItem />
      </Box>
    </Container>
  );
}

export default Read100;
