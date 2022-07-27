import { useCallback, useState } from 'react';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import '../firebase';
import { signOut, getAuth } from 'firebase/auth';
import ProfileModal from './modal/ProfileModal';

function Header() {
  const { user } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClickOpen = useCallback(() => {
    setShowProfileModal(true);
    handleCloseMenu();
  }, [handleCloseMenu]);

  const handleOpenMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(getAuth());
  }, []);

  const handleCloseProfileModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#FFFDFF', backgroundColor: '#F7971C' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: '50px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6" component="div">
              웅진북클럽
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
              <Typography variant="h6" component="div" sx={{ color: '#FFFDFF' }}>
                {user.currentUser?.displayName}
              </Typography>
              <Avatar sx={{ marginLeft: '10px' }} alt="profileImage" src={user.currentUser?.photoURL} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleClickOpen}>
                <Typography textAlign="center">프로필 이미지</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">로그아웃</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileModal open={showProfileModal} handleClose={handleCloseProfileModal} />
    </>
  );
}

export default Header;
