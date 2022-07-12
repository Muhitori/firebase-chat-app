import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStorage } from 'src/hooks/UseStore';
import { SignUpForm } from './forms/SignUpForm';
import { useStyles } from './styles';

export const SignUpPage = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const authModel = useAuthStorage();

  const onSignWithGoogle = () => {
    authModel.signInWithGoogle(() => navigate('/'));
  };

  return (
    <Grid container height="100%" alignItems="center" justifyContent="center">
      <Grid item sm={5}>
        <Paper sx={classes.root}>
          <Typography sx={classes.title} variant="h4">
            Sign up
          </Typography>
          <SignUpForm />
          <Typography variant="body1">
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
          <Button variant="text" onClick={onSignWithGoogle}>
            Sign in with google
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
