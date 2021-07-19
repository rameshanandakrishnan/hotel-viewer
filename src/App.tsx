import React from 'react';
import MUI from './MUI';

import CssBaseline from '@material-ui/core/CssBaseline';

import Hotels from './Hotels';
import Header from './components/Header';

const App: React.FC = () => {
  const collectionId = 'OBMNG';

  return (
    <MUI>
      <CssBaseline />
      <Header />
      <Hotels collectionId={collectionId} />
    </MUI>
  );
};

export default App;
