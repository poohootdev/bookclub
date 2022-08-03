import { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';
import '../../src/firebase';
import { get, child, ref, getDatabase } from 'firebase/database';

function ChallengesListItem({ uid, timestamp, image, description }) {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');

  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  const displayDate = dayjs(timestamp).fromNow() + ' | ' + dayjs(timestamp).format('YYYY/MM/DD');

  const getAnotherUserInfo = useCallback(async (uid) => {
    const snapShot = await get(child(ref(getDatabase()), 'users/' + uid));

    setAvatar(snapShot.val().avatar);
    setName(snapShot.val().name);
  }, []);

  getAnotherUserInfo(uid);

  return (
    <Card sx={{ maxWidth: 400, mb: 4 }}>
      <CardHeader avatar={<Avatar src={avatar} />} title={name} subheader={displayDate} />
      <CardMedia component="img" height="400" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

ChallengesListItem.propTypes = {
  uid: PropTypes.string,
  timestamp: PropTypes.number,
  image: PropTypes.string,
  description: PropTypes.string,
};

export default ChallengesListItem;
