import React from 'react';

import { Modal, Button } from '@geist-ui/react';
import { CSVLink } from 'react-csv';

import { writeToCsv } from './WriteToCSV';

type CSVOutputModalProps = {
  graph: any,
  bindings: {
    open: boolean;
    onClose: () => void;
  },
};

function CSVOutputModal({ graph, bindings } : CSVOutputModalProps) {
  const { data } = writeToCsv(graph);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal width="35rem" {...bindings}>
      <Modal.Title>CSV Output</Modal.Title>
      <Modal.Content>
        <div className="flex justify-center">
          <Button loading={!data} auto><CSVLink data={data}>Ready to Download!</CSVLink></Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export { CSVOutputModal };
