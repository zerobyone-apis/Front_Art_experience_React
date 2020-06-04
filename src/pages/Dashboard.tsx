import React, { Fragment } from 'react';
import { LeftMenu } from '../components/LeftMenu';
import { Toolbar } from '../components/Toolbar';
import './Dashboard.scss';

const DashboardPage = () => {
  return (
    <Fragment>
      <Toolbar />
      <div className="page-box">
        <LeftMenu />
        <div className="dashboard">
        </div>
      </div>
    </Fragment>
  );
};

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
