import { Box, Grid, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Avatar } from 'src/components/common/Avatar';
import { Message as MessageType } from 'src/types/Chat';
import { useAuthStorage } from 'src/hooks/UseStore';
import { useStyles } from './styles';

interface Props {
  message: MessageType;
}
export const Message: FC<Props> = ({ message: { userId, message, date } }) => {
  const classes = useStyles();

  const currentUserId = useAuthStorage().getCurrentUserId();

  const time = useMemo(() => {
    if (!date) return '';

    const dateTime = new Date(date);
    return `${dateTime?.getHours()}:${dateTime?.getMinutes()}`;
  }, [date]);

  const isMyMessage = useMemo(() => currentUserId === userId, [userId]);

  return (
    <Grid container justifyContent={isMyMessage ? 'end' : 'start'}>
      <Avatar />
      <Paper sx={isMyMessage ? classes.myMessage : classes.notMyMessage}>
        <Box whiteSpace="normal">{message}</Box>
        <Typography variant="caption" sx={classes.time}>
          {time}
        </Typography>
      </Paper>
    </Grid>
  );
};