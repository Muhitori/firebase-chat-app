import { Grid } from '@mui/material';
import { ChatArea } from './chat/ChatArea';
import { UsersArea } from './users/UsersArea';

export const MainPage = () => {
  return (
    <Grid container height="100%" display="flex">
      <Grid item xs={7} sm={8} md={9}>
        <ChatArea />
      </Grid>
      <Grid item xs={5} sm={4} md={3}>
        <UsersArea />
      </Grid>
    </Grid>
  );
}