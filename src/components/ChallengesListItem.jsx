import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';

function ChallengesListItem({ uid, timestamp, image, description }) {
  const { user } = useSelector((state) => state);

  /*eslint no-undef: "error"*/
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);
  dayjs.locale('ko');

  const displayDate = dayjs(timestamp).fromNow() + ' | ' + dayjs(timestamp).format('YYYY/MM/DD');

  return (
    <Card sx={{ maxWidth: 400, mb: 4 }}>
      <CardHeader
        avatar={
          user.currentUser.uid === uid ? (
            <Avatar src={user.currentUser?.photoURL} />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          )
        }
        title={user.currentUser.uid === uid ? user.currentUser.displayName : uid}
        subheader={displayDate}
      />
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
