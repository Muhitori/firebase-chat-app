import { Grid } from '@mui/material'
import { useStyles } from './styles';
import { Message } from './Message';

const messages = [
  {
    id: '1',
    message:
      'Renders?Renders?Renders?Renders?Renders?Renders?Renders?Renders?Renders?Renders?',
    avatar: null,
    timestamp: new Date(),
  },
  {
    id: '2',
    message:
      'Renders!Renders!Renders !Renders!Renders!Renders !Renders!Renders!Renders !Renders!Renders!Renders!',
    avatar: null,
    timestamp: new Date(),
  },
];

export const MessageList = () => {
  const classes = useStyles();

  return <Grid container sx={classes.messageList}>
    {messages.map(message => <Message key={message.id} message={message} />)}
  </Grid>;
}