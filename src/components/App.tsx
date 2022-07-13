import 'src/utils/firebase.config';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { RootStoreModel } from 'src/store';
import { RootLayout } from './layout/RootLayout';
import { StoreProvider } from './StoreProvider';

const store = new RootStoreModel();

export const App = () => {
  return (
    <Router>
      <StoreProvider store={store}>
        <CssBaseline />
        <RootLayout />
      </StoreProvider>
    </Router>
  );
};

