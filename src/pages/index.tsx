import React from 'react';

import { Page, Text } from '@geist-ui/react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Index = () => (
  <Main
    meta={(
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
    )}
  >

    <Page dotBackdrop size="mini">
      <Page.Header>
        <Text h2>React Application with Geist UI</Text>
      </Page.Header>
      <Text>
        Hello, I am using
        {' '}
        <Text b>Geist UI</Text>
        {' '}
        !
      </Text>
    </Page>
  </Main>
);

export default Index;
