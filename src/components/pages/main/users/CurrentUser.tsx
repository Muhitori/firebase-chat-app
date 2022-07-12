import { Box, Button } from '@mui/material';
import { User } from 'src/components/common/User';
import { useAuthStorage } from 'src/hooks/UseStore';
import { useStyles } from '../styles';

export const CurrentUser = () => {
  const classes = useStyles();
  
  const authModel = useAuthStorage();
  const currentUser = authModel.getCurrentUser();

  const onSignOut = () => {
    authModel.signOut();
  };
  
  return (
    <Box sx={classes.currentUser}>
      {currentUser && <User user={currentUser} />}
      <Button onClick={onSignOut}>Sign out</Button>
    </Box>
  );
}