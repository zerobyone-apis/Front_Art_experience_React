// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent } from 'react';
import './LoginForm.scss';
import { TextField } from '../TextField';
import { Button } from '../../components/Button';

export const LoginForm = () => {

  const initialValues = {
    username: { value: '', error: '', required: true },
    x: { value: '', error: '', required: true },
    password: { value: '', error: '', required: true }
  }
  const [fields, setFields] = useState(initialValues);
  const onChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [name]: { ...fields[name], value: value } });
  };
  const login = () => {
    document.location.href = 'Dashboard';
  }

  return (
    <div className="login-box">
      <TextField
        name="username"
        label="Usuario"
        type="username"
        value={fields.username.value}
        error={fields.username.error}
        onChange={onChange}
      />
      <TextField
        name="password"
        label="Contrasena"
        type="password"
        value={fields.password.value}
        error={fields.password.error}
        onChange={onChange}
      />
      <Button width="100px" onClick={login} label="Login" />
    </div>
  );
};
LoginForm.displayName = 'Login Form';
