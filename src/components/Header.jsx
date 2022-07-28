import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import '../firebase';
import { Link } from 'react-router-dom';

function Header() {
  const { user } = useSelector((state) => state);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6" component="div">
              웅진북클럽
            </Typography>
          </Box>
          <Box>
            <Link to="/mypage" style={{ textDecoration: 'none' }}>
              <IconButton>
                <Avatar sx={{ marginLeft: '10px' }} alt="profileImage" src={user.currentUser?.photoURL} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
