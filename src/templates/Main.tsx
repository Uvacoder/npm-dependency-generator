import React, { ReactNode } from 'react';

import { Divider, Page } from '@geist-ui/react';

import { Config } from '../utils/Config';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full">
    {props.meta}

    <Page size="small" className="max-w-screen-md mx-auto">
      <Page.Header className="pt-16 pb-8">
        <div className="font-bold text-3xl text-gray-900">{Config.title}</div>
      </Page.Header>
      <Divider />

      <div className="py-5 text-xl content">{props.children}</div>

      <Divider />
      <Page.Footer className="text-center py-8 text-sm">
        <a href="https://github.com/alanqchen">GitHub Repository</a>
        {' '}
        | Made with
        {' '}
        <span role="img" aria-label="Love">
          ♥
        </span>
        {' '}
        by
        {' '}
        <a href="https://aqchen.com">Alan Chen</a>
      </Page.Footer>
    </Page>
  </div>
);

export { Main };
