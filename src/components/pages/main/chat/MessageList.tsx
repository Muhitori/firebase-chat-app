import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite';
import { useChatStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';
import { Message } from './Message';

export const MessageList = observer(() => {
  const classes = useStyles();
  const { messages } = useChatStorage();

  return (
    <Grid container sx={classes.messageList}>
      {messages &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
    </Grid>
  );
});