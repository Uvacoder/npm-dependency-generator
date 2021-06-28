/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as gtag from '../utils/gtag';

import '../styles/main.css';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  </QueryClientProvider>
);

export default MyApp;
