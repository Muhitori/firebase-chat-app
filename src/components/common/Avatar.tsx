import MuiAvatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { CSSProperties, FC } from 'react';
import { Badge, styled } from '@mui/material';

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

const OfflineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#9e9e9e',
    color: '#9e9e9e',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

interface Props {
  online?: boolean;
  avatar?: string | null;
  styles?: CSSProperties
}

export const AvatarWithBadge: FC<Props> = ({ online, avatar, styles }) => {
  if (avatar) {
    const userAvatar = (
      <MuiAvatar sx={{ ...styles, marginRight: '0.5rem' }} src={avatar} />
    );

    return online ? (
      <OnlineBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {userAvatar}
      </OnlineBadge>
    ) : (
      <OfflineBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {userAvatar}
      </OfflineBadge>
    );
  }

  const userAvatar = (
    <MuiAvatar sx={{ ...styles, marginRight: '0.5rem' }}>
      <PersonIcon />
    </MuiAvatar>
  );

  return online ? (
    <OnlineBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      {userAvatar}
    </OnlineBadge>
  ) : (
    <OfflineBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      {userAvatar}
    </OfflineBadge>
  );
};

export const Avatar: FC<Props> = ({ online, avatar, styles }) => {

  if (typeof online === 'boolean') {
    return <AvatarWithBadge online={online} avatar={avatar} styles={styles} />;
  }

  if (avatar) {
    return (
      <MuiAvatar sx={{ ...styles, marginRight: '0.5rem' }} src={avatar} />
    );
  }

  return (
    <MuiAvatar sx={{ ...styles, marginRight: '0.5rem' }}>
      <PersonIcon />
    </MuiAvatar>
  );
};