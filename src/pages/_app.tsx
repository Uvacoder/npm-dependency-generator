/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { AppProps } from 'next/app';
import Router from 'next/router';

import * as gtag from '../utils/gtag';

import '../styles/main.css';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

const MyApp = ({ Component, pageProps }: AppProps) => (
  <GeistProvider>
    <CssBaseline />
    <Component {...pageProps} />
  </GeistProvider>
);

export default MyApp;
