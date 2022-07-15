import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Avatar } from 'src/components/common/Avatar';
import { Message as MessageType } from 'src/types/Chat';
import { useAuthStorage, useChatStorage } from 'src/hooks/UseStore';
import { observer } from 'mobx-react-lite';
import { useStyles } from './styles';

interface Props {
  message: MessageType;
}

export const Message: FC<Props> = observer(({ message: { userId, message, userName, date } }) => {
  const classes = useStyles();

  const { currentUser } = useAuthStorage();
  const { companionAvatar } = useChatStorage();

  const [avatar, setAvatar] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (userId === currentUser?.uid) {
      return setAvatar(currentUser?.avatarURL);
    }

    return setAvatar(companionAvatar);
  }, [userId, companionAvatar]);

  const time = useMemo(() => {
    if (!date) return '';

    const [hours, minutes] = new Date(date).toLocaleTimeString().split(':');
    return `${hours}:${minutes}`;
  }, [date]);

  const isMyMessage = useMemo(() => currentUser?.uid === userId, [userId]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent={isMyMessage ? 'end' : 'start'}
    >
      <Avatar avatar={avatar} />
      <Paper sx={isMyMessage ? classes.myMessage : classes.notMyMessage}>
        <Typography variant="subtitle2" sx={classes.username}>
          {userName}
        </Typography>
        <Typography variant="body1" whiteSpace="normal" paddingRight="2rem">
          {message}
        </Typography>
        <Typography variant="caption" sx={classes.time}>
          {time}
        </Typography>
      </Paper>
    </Grid>
  );
});