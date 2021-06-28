import React from 'react';

import { Tree } from '@geist-ui/react';

type OutputFileTreeProps = {
  tree: any,
};

function OutputFileTree({ tree } : OutputFileTreeProps) {
  return (
    <Tree value={tree} />
  );
}

export { OutputFileTree };
