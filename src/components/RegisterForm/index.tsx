import React, { useContext, useEffect, useState } from 'react';
import './RegisterForm.scss';
import { FormContext } from '../../contexts/FormContext';
import { TextField } from '../TextField';
import { Button } from '../Button';
export const RegisterForm = (props: { className?: string }) => {
  const initialValues = { username: '', email: '', password: '' };
  // eslint-disable-next-line no-unused-vars
  const [clear, setClear] = useState(false);
  const {
    // @ts-ignore
    values,
    onChange,
    setInitialValues,
  } = useContext(FormContext);
  useEffect(() => {
    setInitialValues(initialValues);
  }, []);
  useEffect(() => {
    if (values === initialValues) setClear(true);
  }, [values]);
  // @ts-ignore
  const { username, password, email } = values;
  return (
    <form className={`${props.className} register-box`}>
      <TextField
        name="username"
        type="text"
        label="Username"
        value={username}
        onChange={onChange}
        required={true}
      />
      <TextField
        name="email"
        type="email"
        label="Email"
        value={email}
        onChange={onChange}
        required={true}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={onChange}
        required={true}
      />
      <Button width="100px" type="submit" label="Sign Up" />
    </form>
  );
};
RegisterForm.displayName = 'Login Form';
