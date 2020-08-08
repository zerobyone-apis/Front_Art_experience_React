import '../styles/theme.scss';
import './app.scss';

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { FC } from 'react';

import { ButtonProvider } from '../contexts/ButtonsContext';
import { USER_DATA_STORAGE } from '../types/StorageData.type';
import { UserProvider } from '../contexts/UserContext';

const App: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const store = require('store'); // store :3
  return (
    <div>
      <ButtonProvider disabled={false}>
        <UserProvider value={store.get(USER_DATA_STORAGE) || null}>
          <Component {...pageProps} />
        </UserProvider>
      </ButtonProvider>
    </div>
  )
};
export default App;
