import React from 'react';

import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { HotelWithRooms } from '../../services/hotel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  images: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
  root: {
    width: '100%',
  },
}));

const HotelCard: React.FC<{ hotel: HotelWithRooms; renderAction: () => JSX.Element }> = ({
  hotel,
  renderAction,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testref='hotel'>
      <CardMedia
        component='img'
        alt='Hotel Image'
        height='200'
        image={hotel.images[0].url}
        title='Hotel Image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {hotel.name}
        </Typography>
        {Boolean(hotel.starRating) && <Rating value={parseInt(hotel.starRating)} readOnly={true} />}
        <Typography variant='body2' color='textSecondary' paragraph={true}>
          {hotel.town}/{hotel.country}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Available Room Types for your search criteria : <strong>{hotel.rooms.length}</strong>
        </Typography>
      </CardContent>
      <CardActions>{renderAction()}</CardActions>
    </Card>
  );
};

export default HotelCard;
