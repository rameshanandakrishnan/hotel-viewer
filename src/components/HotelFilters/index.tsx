import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Typography } from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import Rating from '@material-ui/lab/Rating';
import StepIncrementer from '../StepIncrementor';

const MIN = 0;
const MAX = 10;

const useStyles = makeStyles(() => ({
  toolbar: {
    background: '#fff',
    borderBottom: '1px solid #E6EAEA',
    marginBottom: '16px',
    maxWidth: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  separatorBox: {
    height: '65px',
    padding: '0 24px',
    borderRight: '1px solid #E6EAEA',
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto',
  },
  label: {
    paddingRight: '8px',
  },
  resetButton: {
    marginLeft: '8px',
  },
}));

export type Filters = {
  ratings: number | null;
  adults: number;
  children: number;
};

type HotelFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

const filterDefault = {
  ratings: 0,
  adults: 0,
  children: 0,
};

const HotelFilters: React.FC<HotelFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<Filters>(filterDefault);
  const classes = useStyles();
  const didMountRef = React.useRef(false);

  const handleGuestChange = (
    { currentTarget: { name, value } }: React.MouseEvent<HTMLInputElement>,
    action: 'add' | 'remove'
  ) => {
    const guestType = name as 'children' | 'adults';

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        action === 'add' ? (prevFilters[guestType] || 0) + 1 : (prevFilters[guestType] || 0) - 1,
    }));
  };

  const handleReset = () => {
    setFilters(filterDefault);
  };

  React.useEffect(() => {
    if (didMountRef.current) {
      onFilterChange(filters);
    } else {
      didMountRef.current = true;
    }
  }, [filters, onFilterChange]);

  return (
    <Toolbar className={classes.toolbar} id='hotelFilters'>
      <Box className={classes.separatorBox}>
        <FilterListIcon />
      </Box>

      <Box className={classes.separatorBox}>
        <Typography className={classes.label}>Star Rating: </Typography>
        <Rating
          name='rating'
          value={filters.ratings}
          onChange={(_, value) => {
            setFilters((prevFilters) => ({ ...prevFilters, ratings: value || 0 }));
          }}
          emptyLabelText='Select a Hotel Rating'
        />
      </Box>

      <Box className={classes.separatorBox}>
        <Typography className={classes.label}>Adults : </Typography>
        <StepIncrementer
          min={MIN}
          max={MAX}
          name='adults'
          value={filters.adults}
          onClick={handleGuestChange}
        />
      </Box>

      <Box className={classes.separatorBox}>
        <Typography className={classes.label}>Children : </Typography>
        <StepIncrementer
          min={MIN}
          max={MAX}
          name='children'
          value={filters.children}
          onClick={handleGuestChange}
        />
      </Box>

      <Button
        color='secondary'
        variant='outlined'
        onClick={handleReset}
        className={classes.resetButton}>
        Reset Filters
      </Button>
    </Toolbar>
  );
};

export default React.memo(HotelFilters);
