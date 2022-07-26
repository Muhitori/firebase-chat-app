import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthStorage } from 'src/hooks/UseStore';
import { SignInForm } from './forms/SignInForm';
import { useStyles } from './styles';

export const SignInPage = () => {
  const classes = useStyles();
  const authModel = useAuthStorage();

  const onSignWithGoogle = () => {
    authModel.signInWithGoogle();
  }

  return (
    <Grid container height="100%" alignItems="center" justifyContent="center">
      <Grid item sm={5}>
        <Paper sx={classes.root}>
          <Typography sx={classes.title} variant="h4">Sign in</Typography>
          <SignInForm />
          <Typography variant="body1">
            Do not have account? <Link to="/register">Sign Up</Link>
          </Typography>
          <Button variant="text" onClick={onSignWithGoogle}>
            Sign in with google
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

