import { Box, Typography } from '@mui/material';
import { CSSProperties, FC, useMemo } from 'react';
import { IUser } from 'src/types/User';
import { Avatar } from '../../../common/Avatar';
import { useStyles } from './styles';

interface Props {
  user: IUser;
  styles?: CSSProperties;
  isCompanion?: boolean;
  onClick?: (uid: string) => void;
}

export const User: FC<Props> = ({ user, styles, isCompanion, onClick }) => {
  const classes = useStyles();
  const { uid, name, email, avatarURL, online } = user;

  const renderStyles = useMemo(() => {
    if (isCompanion) {
      return { ...styles, ...classes.companion };
    }
    return styles;
  }, [isCompanion]);

  const handleUserClick = () => {
    if (onClick) {
      onClick(uid);
    }
  }

  return (
    <Box sx={{ ...classes.user, ...renderStyles }} onClick={handleUserClick}>
      <Avatar online={online} avatar={avatarURL} />
      <Typography noWrap>{name || email}</Typography>
    </Box>
  );
};