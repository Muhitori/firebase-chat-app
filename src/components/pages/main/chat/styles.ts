import { CSSProperties } from '@mui/styles';
import { MuiStyles } from 'src/types/UI';

const message: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '50%',
  marginBottom: '0.5rem',
  padding: '0.5rem',
  paddingBottom: 0
}

const INPUT_AREA_HEIGHT = '5rem';

export const useStyles = (): MuiStyles => ({
  chatArea: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  messageList: {
    maxHeight: `calc(100vh - ${INPUT_AREA_HEIGHT})`,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '1rem',
    overflow: 'auto',
  },
  myMessage: {
    ...message,
    backgroundColor: '#81d4fa',
  },
  notMyMessage: {
    ...message,
    backgroundColor: '#f48fb1',
  },
  username: {
    color: '#757575',
    fontSize: 10,
    fontWeight: 700,
  },
  time: {
    color: '#757575',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: INPUT_AREA_HEIGHT,
    borderTop: '1px solid black',
    padding: '1rem',
  },
  input: {
    marginRight: '1rem',
  },
});
