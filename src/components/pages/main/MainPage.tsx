import { Grid } from '@mui/material';
import { ChatArea } from './chat/ChatArea';
import { UsersArea } from './users/UsersArea';

export const MainPage = () => {
  return (
    <Grid container height="100%">
      <Grid item sm={9}>
        <ChatArea />
      </Grid>
      <Grid item sm={3}>
        <UsersArea />
      </Grid>
    </Grid>
  );
}