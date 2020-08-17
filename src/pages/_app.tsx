import '../styles/theme.scss';
import './app.scss';
import React, { FC } from 'react';

import { ButtonProvider } from '../contexts/ButtonsContext';
import { BARBERLIST_DATA_STORAGE } from '../types/StorageData.type';
import { BarberListProvider } from '../contexts/BarberListContext';
import { USER_DATA_STORAGE } from '../types/StorageData.type';
import { UserProvider } from '../contexts/UserContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const App: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const store = require('store'); // store :3
  return (
    <div>
      <ButtonProvider disabled={false}>
        <UserProvider value={store.get(USER_DATA_STORAGE) || null}>
          <BarberListProvider value={store.get(BARBERLIST_DATA_STORAGE) || null}>
            <ThemeProvider value="dark">
              <Component {...pageProps} />
            </ThemeProvider>
          </BarberListProvider>
        </UserProvider>
      </ButtonProvider>
    </div>
  )
};
export default App;
