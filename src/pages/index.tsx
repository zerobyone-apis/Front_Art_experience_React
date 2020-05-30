import React, { useState, Fragment } from 'react';
import { LoginForm } from '../components/LoginForm/index';
import { RegisterForm } from '../components/RegisterForm/index';
import { FormProvider } from '../contexts/FormContext';
import { Button } from '../components/Button';
import './index.scss';

const IndexPage = () => {
  const [login, setLogin] = useState(true);

  const AccountBox = () => {
    if (login) {
      return (
        <Fragment>
          <LoginForm />
          <div className="account-footer">
            <p className="info-label">If you not have a account</p>
            <Button
              width="150px"
              label="Register Here"
              onClick={() => setLogin(false)}
            />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {/* <FormProvider fields={{ username: '', email: '', password: '' }}>
            <RegisterForm />
          </FormProvider> */}
          <div className="account-footer">
            <p className="info-label">If you have a account</p>
            <Button
              width="150px"
              label="Login Here"
              onClick={() => setLogin(true)}
            />
          </div>
        </Fragment>
      );
    }
  };

  return (
    <div className="background-page">
      <div className="account-box">
        <h2 className="account-box__title">WeCollab</h2>
        <AccountBox />
      </div>
    </div>
  );
};

IndexPage.displayName = 'Index Page';
export default IndexPage;
