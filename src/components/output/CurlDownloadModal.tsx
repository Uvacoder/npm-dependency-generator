import React from 'react';

import { Modal, Snippet } from '@geist-ui/react';

type CurlOutputModalProps = {
  bindings: {
    open: boolean;
    onClose: () => void;
  },
};

function CurlOutputModal({ bindings } : CurlOutputModalProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal width="35rem" {...bindings}>
      <Modal.Title>Bulk Download with cURL</Modal.Title>
      <Modal.Content>
        <ol>
          <li>
            Download the CSV and place it in the
            directory where you want to download the dependencies.
          </li>
          <li>
            Run the following command in the directory:
          </li>
        </ol>
        <Snippet text='grep "https://registry.npmjs.org" generatedBy_react-csv.csv | cut -d, -f 4 | xargs -n 1 curl -O' />
        <p className="font-bold">Windows PowerShell</p>
        <Snippet text='Import-Csv .\generatedBy_react-csv.csv | ForEach-Object {Invoke-WebRequest -Uri $_."DIST URL" -OutFile "$($_.NAME -replace "\\|/", "-")-$($_.VERSION).tgz"}' />
      </Modal.Content>
    </Modal>
  );
}

export { CurlOutputModal };
