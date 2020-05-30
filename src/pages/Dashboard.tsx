import React, { Fragment } from 'react';
import { LeftMenu } from '../components/LeftMenu';
import { Toolbar } from '../components/Toolbar';
import './Dashboard.scss';

const logo = require('../assets/logo.jpeg');

const DashboardPage = () => {
  return (
    <Fragment>
      <Toolbar />
      <div className="page-box">
        <LeftMenu />
        <div className="dashboard">
          <img src={logo} alt="" />
        </div>
      </div>
    </Fragment>
  );
};

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
