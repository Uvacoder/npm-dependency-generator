import React from 'react';

type OutputFileTreeProps = {
  tree: any,
};

function OutputBullets({ tree } : OutputFileTreeProps) {
  return (
    <ul>
      {tree.map((pckge: { name: string, extra: string, files: any; }) => (
        <li key={pckge.name} className="text-sm">
          {pckge.name}
          {' '}
          <p className="inline text-gray-600">
            (
            {pckge.extra}
            )
          </p>
          {pckge.files && <OutputBullets tree={pckge.files} />}
        </li>
      ))}
    </ul>
  );
}

export { OutputBullets };
