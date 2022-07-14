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
  userList: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingTop: '0.5rem',
  },
  user: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    paddingLeft: '0.2rem',
    cursor: 'pointer'
  },
  companion: {
    backgroundColor: '#e1f5fe',
  },
});
