import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

function Read100ListItem() {
  return (
    <Card sx={{ maxWidth: 400, mb: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="닉네임"
        subheader="2022-07-24"
      />
      <CardMedia component="img" height="194" image="https://picsum.photos/400/400/?random" alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="secondary">
          이제 시작이에요~ ^^
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Read100ListItem;
