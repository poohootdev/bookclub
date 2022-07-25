import { Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ProfileModal({ open, handleClose }) {
  const [previewImage, setPreviewImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  //   const [blob, setBolb] = useState('');
  const avatarEditorRef = useRef(null);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setPreviewImage(reader.result);
    });
  }, []);

  const handleCropImage = useCallback(() => {
    avatarEditorRef.current.getImageScaledToCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setCroppedImage(imageUrl);
      //   setBolb(blob);
    });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>⚙️프로필 이미지 변경</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          <Input
            type="file"
            onChange={handleChange}
            inputProps={{ accept: 'image/jpeg, image/jpg, image/png' }}
            label="변경할 프로필 이미지 선택"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {previewImage && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={previewImage}
                width={120}
                height={120}
                border={50}
                scale={2}
                style={{ display: 'inline' }}
              />
            )}
            {croppedImage && (
              <img alt="cropped" style={{ marginLeft: '50px' }} width={100} height={100} src={croppedImage} />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>취소</Button>
        {previewImage && <Button onClick={handleCropImage}>이미지 자르기</Button>}
        {croppedImage && <Button>저장</Button>}
      </DialogActions>
    </Dialog>
  );
}

ProfileModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ProfileModal;
