import MuiAvatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { CSSProperties, FC } from 'react';
import { Badge, styled } from '@mui/material';

const OnlineBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    '&::after': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  },
}));

const OfflineBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#9e9e9e',
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
      <MuiAvatar src={avatar} />
    );

    return online ? (
      <OnlineBadge
        sx={{ ...styles, marginRight: '0.5rem' }}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {userAvatar}
      </OnlineBadge>
    ) : (
      <OfflineBadge
        sx={{ ...styles, marginRight: '0.5rem' }}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {userAvatar}
      </OfflineBadge>
    );
  }

  const userAvatar = (
    <MuiAvatar>
      <PersonIcon />
    </MuiAvatar>
  );

  return online ? (
    <OnlineBadge
      sx={{ ...styles, marginRight: '0.5rem' }}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      {userAvatar}
    </OnlineBadge>
  ) : (
    <OfflineBadge
      sx={{ ...styles, marginRight: '0.5rem' }}
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