import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useChatStorage } from 'src/hooks/UseStore';
import { ChatArea } from './chat/ChatArea';
import { UsersArea } from './users/UsersArea';

export const MainPage = observer(() => {
  const { unsubscribe } = useChatStorage();

  useEffect(() => {
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
});