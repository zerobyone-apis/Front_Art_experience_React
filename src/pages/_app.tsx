/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { ReactElement, FC } from 'react';
import './index.scss';
const App: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => <Component {...pageProps} />;
export default App;
