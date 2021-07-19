import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Room } from '../../services/hotel';

const useStyles = makeStyles(() => ({
  images: {
    width: '100%',
    paddingTop: '8px',
  },
}));

const RoomDetails: React.FC<{ room: Room }> = ({ room }) => {
  const classes = useStyles();
  const adults = room.occupancy.maxAdults;
  const children = room.occupancy.maxOverall
    ? room.occupancy.maxOverall - room.occupancy.maxAdults
    : room.occupancy.maxChildren;
  const roomImage = room?.images?.length ? room.images[0].url : undefined;

  return (
    <Grid container={true} spacing={2} data-testref={`room-${room.id}`}>
      {!!roomImage && (
        <Grid item={true} md={4}>
          <img src={roomImage} alt='Room' className={classes.images} />
        </Grid>
      )}
      <Grid item={true} md={roomImage ? 8 : 12}>
        <Typography variant='h5'>{room.name}</Typography>
        <Typography variant='body1' paragraph={true}>
          Sleeps <strong>{adults}</strong> adults and <strong>{children}</strong>{' '}
          {children === 1 ? 'child' : 'children'}{' '}
          <small>
            <i>
              {room.occupancy.maxOverall ? ` ( Max Capacity: ${room.occupancy.maxOverall} )` : null}
            </i>
          </small>
        </Typography>
        <Typography paragraph={true} variant='body2'>
          {room.longDescription}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RoomDetails;
