import { Box } from '@mui/material';
import { CSSProperties, FC } from 'react';
import { IUser } from 'src/types/User';
import { Avatar } from './Avatar';

interface Props {
  user: IUser;
  styles?: CSSProperties;
}

export const User: FC<Props> = ({ user, styles }) => {
  const { uid, name, email, avatar } = user;

  return (
    <Box display="flex" alignItems="center" sx={styles}>
      <Avatar avatar={avatar} />
      {name || email}
    </Box>
  );
};