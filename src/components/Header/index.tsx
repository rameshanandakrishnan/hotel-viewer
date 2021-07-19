import React from 'react';

import { makeStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: Theme) => ({
  logo: {
    display: 'flex',
    height: '60px',
    padding: '5px 0',
    maxWidth: '100%',
  },
  appBar: {
    width: '100%',
    background: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #E6EAEA',
    alignItems: 'center',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.appBar}>
      <Logo className={classes.logo} />
    </AppBar>
  );
};

export default Header;
