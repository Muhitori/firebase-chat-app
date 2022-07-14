import 'src/utils/firebase.config';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { RootStoreModel } from 'src/store';
import { SnackbarProvider } from 'notistack';
import { RootLayout } from './layout/RootLayout';
import { StoreProvider } from './StoreProvider';

const store = new RootStoreModel();
const MAX_SNACK = 3;

export const App = () => {
  return (
    <Router>
      <SnackbarProvider maxSnack={MAX_SNACK}>
        <StoreProvider store={store}>
          <CssBaseline />
          <RootLayout />
        </StoreProvider>
      </SnackbarProvider>
    </Router>
  );
};

