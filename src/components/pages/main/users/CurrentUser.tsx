import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useAuthStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';
import { User } from './User';

export const CurrentUser = observer(() => {
  const classes = useStyles();
  const authModel = useAuthStorage();
  const {currentUser} = authModel;

  useEffect(() => {
    authModel.setCurrentUserAsync();
  }, []);

  const onSignOut = () => {
    if (currentUser) {
      authModel.signOut(currentUser.uid);
    }
  };
  
  return (
    <Box sx={classes.currentUser}>
      {currentUser && <User user={currentUser} />}
      <Button onClick={onSignOut}>Sign out</Button>
    </Box>
  );
});