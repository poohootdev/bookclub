import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AvatarEditor from 'react-avatar-editor';
import { Alert, Stack, Typography, Box, Container, TextField, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function ChallengeInsert() {
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const image = data.get('image').name;
    const description = data.get('description');

    if (!image) {
      setError('사진을 추가해 주세요.');
      return;
    }

    if (!description) {
      setError('설명을 입력해 주세요.');
      return;
    }

    setError('');
  }, []);

  return (
    <>
      <Link to="/challenge" style={{ textDecoration: 'none' }}>
        <ArrowBackIcon sx={{ mt: 2, ml: 2, fontSize: 40 }} color="primary" />
      </Link>
      <Stack alignItems="center">
        <Typography component="h1" variant="h5">
          100권 도전 등록하기
        </Typography>
      </Stack>
      <Container component="main" maxWidth="xs">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <AddAPhotoIcon color="primary" sx={{ width: 40, height: 40 }} />
          <Input
            name="image"
            type="file"
            fullWidth
            onChange={handleChange}
            inputProps={{ accept: 'image/jpeg, image/jpg, image/png' }}
            label="이미지 선택"
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {previewImage && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={previewImage}
                width={400}
                height={400}
                border={0}
                scale={1}
                style={{ display: 'inline' }}
              />
            )}
          </div>

          <AutoStoriesIcon color="primary" sx={{ width: 40, height: 40, mt: 3 }} />
          <TextField
            name="description"
            required
            fullWidth
            label="스토리"
            multiline
            rows={4}
            placeholder="남기고 싶은 스토리를 입력하세요."
          />
          {error ? (
            <Alert sx={{ mt: 3 }} severity="error">
              {error}
            </Alert>
          ) : null}
          <LoadingButton type="submit" fullWidth size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
            등록하기
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
}

export default ChallengeInsert;
