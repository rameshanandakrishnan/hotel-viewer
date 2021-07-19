import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 'bold',
    flex: '1 0 auto',
    paddingRight: '8px',
  },
  icon: {
    color: theme.palette.primary.main,
    border: '1px solid currentColor',
    width: 38,
    height: 38,
    padding: 0,
  },
  value: {
    minWidth: theme.spacing(5),
    textAlign: 'center',
  },
}));

interface Props {
  label?: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onClick: (e: any, action: 'add' | 'remove') => void;
}

const StepIncrementer: React.FC<Props> = ({ label, name, value, min, max, onClick }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {label && <span className={classes.label}>{label}</span>}
      <IconButton
        name={name}
        value={value}
        classes={{ root: classes.icon }}
        color='secondary'
        disabled={value === min}
        onClick={(e) => onClick(e, 'remove')}>
        <RemoveIcon />
      </IconButton>
      <span className={classes.value}>{value}</span>
      <input name={name} type='hidden' value={value} />
      <IconButton
        name={name}
        value={value}
        classes={{ root: classes.icon }}
        color='secondary'
        disabled={value === max}
        onClick={(e) => onClick(e, 'add')}>
        <AddIcon />
      </IconButton>
    </Fragment>
  );
};

export default StepIncrementer;
