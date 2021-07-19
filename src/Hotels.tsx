import React from 'react';
import { useAsync } from 'react-async';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import HotelCard from './components/HotelCard';
import { getHotelsWithRooms, HotelWithRooms } from './services/hotel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import HotelFilters, { Filters } from './components/HotelFilters';
import RoomDetails from './components/Room';

const Hotels: React.FC<{ collectionId: string }> = ({ collectionId }) => {
  const [hotel, setHotel] = React.useState<HotelWithRooms>();
  const [showDialog, setShowDialog] = React.useState(false);
  const [hotelData, setHotelDate] = React.useState<HotelWithRooms[]>();

  const { data: originalHotelData, isLoading } = useAsync({
    watch: `${collectionId}`,
    promiseFn: React.useCallback(async () => {
      const response = await getHotelsWithRooms(collectionId);

      return response;
    }, [collectionId]),
  });

  React.useEffect(() => {
    if (!hotelData && originalHotelData) {
      setHotelDate(originalHotelData);
    }
  }, [originalHotelData, hotelData]);

  const handleHotelSelection = (hotel: HotelWithRooms) => {
    setHotel(hotel);
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const filterHotelsByStarRating = (filters: Filters) => (hotel: HotelWithRooms) =>
    filters.ratings === 0 || filters.ratings! === parseInt(hotel.starRating);

  const filterHotelRoomsByOccupancy = (filters: Filters) => (hotel: HotelWithRooms) => {
    const filteredRooms = hotel.rooms.filter((room) => {
      return (
        (!room.occupancy.maxOverall ||
          filters.adults + filters.children <= room.occupancy.maxOverall) &&
        filters.adults <= room.occupancy.maxAdults &&
        filters.children <= room.occupancy.maxChildren
      );
    });

    return { ...hotel, rooms: filteredRooms };
  };

  const filterOutHotelsWithRooms = (hotel: HotelWithRooms) => hotel.rooms.length > 0;

  const handleFilterChange = React.useCallback(
    (filters: Filters) => {
      if (Object.values(filters).every((filter) => filter === 0)) {
        setHotelDate(originalHotelData);
      } else {
        const filteredHotels = originalHotelData
          ?.filter(filterHotelsByStarRating(filters))
          .map(filterHotelRoomsByOccupancy(filters))
          .filter(filterOutHotelsWithRooms);

        setHotelDate(filteredHotels);
      }
    },
    [originalHotelData]
  );

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        <CircularProgress color='secondary' size='100px' />
      </Box>
    );
  }

  return (
    <>
      <HotelFilters onFilterChange={handleFilterChange} />
      <Container>
        <Grid container spacing={2} id='hotelWrapper'>
          {!!hotelData &&
            hotelData.map((hotel, index) => (
              <Grid item xs={12} md={4} key={`hotel-${index}`}>
                <HotelCard
                  hotel={hotel}
                  renderAction={() => (
                    <Button
                      size='small'
                      color='secondary'
                      variant='contained'
                      fullWidth={true}
                      onClick={() => handleHotelSelection(hotel)}>
                      View Rooms
                    </Button>
                  )}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Dialog open={showDialog} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth={true}>
        <DialogTitle>{hotel?.name}</DialogTitle>
        <DialogContent dividers={true}>
          {!!hotel?.rooms &&
            hotel.rooms.map((room, index) => {
              return <RoomDetails key={`room-${index}`} room={room} />;
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Hotels;
