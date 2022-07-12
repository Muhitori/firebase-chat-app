import { Box } from '@mui/material';
import { useStyles } from '../styles';
import { CurrentUser } from './CurrentUser';

export const UsersArea = () => {
  const classes = useStyles();
  
  return (
    <Box sx={classes.usersArea}>
      <CurrentUser />
      <Box>
        <div />
      </Box>
    </Box>
  );
}