import { MuiStyles } from 'src/types/UI';

export const useStyles = (): MuiStyles => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  title: {
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1rem',
  },
});
