import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PasswordInput from 'src/components/common/PasswordInput';
import TextInput from 'src/components/common/TextInput';
import { SignInUser } from 'src/types/User';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useAuth } from 'src/hooks/UseStore';
import { useStyles } from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email('Email field does not match requirements'),
  password: Yup.string().required().min(8),
});

const initialValues = {
  email: '',
  password: ''
};

export const SignInForm: FC = () => {
  const classes = useStyles();
  const authModel = useAuth();

  const handleSubmit = (formData: SignInUser) => {
    authModel.signIn(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={classes.form}>
          <TextInput
            className={classes.input}
            error={errors.email}
            touched={touched.email}
            name="email"
            label="Email"
          />
          <PasswordInput
            className={classes.input}
            error={errors.password}
            touched={touched.password}
            name="password"
            label="Password"
          />
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};