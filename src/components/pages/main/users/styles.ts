import { MuiStyles } from 'src/types/UI';

export const useStyles = (): MuiStyles => ({
  usersArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    borderLeft: '1px solid black',
  },
  currentUser: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid black',
  },
});
