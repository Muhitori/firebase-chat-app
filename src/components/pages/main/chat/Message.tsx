import { Box, Grid, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Avatar } from 'src/components/common/Avatar';
import { Message as MessageType } from 'src/types/Chat';
import { useAuthStorage, useChatStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';

interface Props {
  message: MessageType;
}
export const Message: FC<Props> = ({ message: { userId, message, date } }) => {
  const classes = useStyles();

  const { currentUser, getCurrentUserId } = useAuthStorage();
  const { companionAvatar } = useChatStorage();

  const time = useMemo(() => {
    if (!date) return '';

    const dateTime = new Date(date);
    return `${dateTime?.getHours()}:${dateTime?.getMinutes()}`;
  }, [date]);

  const isMyMessage = useMemo(() => getCurrentUserId() === userId, [userId]);

  const avatar = useMemo(() => {
    if (currentUser && userId === getCurrentUserId()) {
      return currentUser.avatar;
    }

    return companionAvatar;
  }, []);

  return (
    <Grid container justifyContent={isMyMessage ? 'end' : 'start'}>
      <Avatar avatar={avatar} />
      <Paper sx={isMyMessage ? classes.myMessage : classes.notMyMessage}>
        <Box whiteSpace="normal">{message}</Box>
        <Typography variant="caption" sx={classes.time}>
          {time}
        </Typography>
      </Paper>
    </Grid>
  );
};