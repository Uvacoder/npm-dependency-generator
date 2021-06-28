import React from 'react';

import { Button, ButtonGroup, useModal } from '@geist-ui/react';

import { CSVOutputModal } from './CSVOutputModal';
import { CurlOutputModal } from './CurlDownloadModal';

type ExportDataProps = {
  graph: any
};

function ExportData({ graph } : ExportDataProps) {
  const { setVisible: csvSetVisible, bindings: csvBindings } = useModal();
  const { setVisible: curlSetVisible, bindings: curlBindings } = useModal();

  return (
    <>
      <ButtonGroup type="success" size="small">
        <Button onClick={() => csvSetVisible(true)}>CSV</Button>
        <Button onClick={() => curlSetVisible(true)}>cURL</Button>
      </ButtonGroup>
      <CSVOutputModal graph={graph} bindings={csvBindings} />
      <CurlOutputModal bindings={curlBindings} />
    </>
  );
}

export { ExportData };
