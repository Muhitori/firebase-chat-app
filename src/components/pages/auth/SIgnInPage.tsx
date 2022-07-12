import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/UseStore';
import { SignInForm } from './SignInForm';
import { useStyles } from './styles';

export const SignInPage = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const authModel = useAuth();

  const onSignWithGoogle = () => {
    authModel.signInWithGoogle(() => navigate('/'));
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

