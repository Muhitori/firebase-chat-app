import { Box } from '@mui/material';
import { useStyles } from '../styles';
import { CurrentUser } from './CurrentUser';
import { UserList } from './UserList';

export const UsersArea = () => {
  const classes = useStyles();

  return (
    <Box sx={classes.usersArea}>
      <CurrentUser />
      <UserList />
    </Box>
  );
}