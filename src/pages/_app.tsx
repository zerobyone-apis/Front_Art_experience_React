/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { ReactElement, FC } from 'react';
import { ButtonProvider } from '../contexts/ButtonsContext';
import { ClientProvider } from '../contexts/ClientContext';
import './index.scss';
const App: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return (
    <div>
      <ButtonProvider disabled={false}>
        <ClientProvider >
          <Component {...pageProps} />
        </ClientProvider>
      </ButtonProvider>
    </div>
  )
};
export default App;
