import React, { useEffect, useState } from 'react';

import {
  Badge,
  Card, Loading, Spinner, Tabs,
} from '@geist-ui/react';

import { Config } from '../../utils/Config';
import { ExportData } from './ExportData';
import { OutputBullets } from './OutputBullets';
import { OutputFileTree } from './OutputFileTree';
import { usePackage, useDepenTree } from './queries/queries';

type OutputDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  packageName: string;
  showDisplay: boolean;
  className?: string
};

function OutputDisplay({ packageName, showDisplay, className } : OutputDisplayProps) {
  // eslint-disable-next-line no-useless-escape
  const regExp = /(@?\S+[^@])@([\S]+)?$/;
  const regExpLatest = /@latest$/;
  const matches = packageName.match(regExp);
  let name = packageName;
  let version = 'latest';
  if (matches) {
    [, name, version] = matches;
  } else if (packageName.match(regExpLatest)) {
    name = name.substr(0, name.length - 7);
  }

  const {
    status, data, error, isFetching,
  } = usePackage(name, version);

  const [nodeCount, setNodeCount] = useState(0);

  type ChangeRecord = {
    changeType: 'add' | 'remove' | 'update',
    node?: any,
    link?: any,
  }[];

  const {
    status: gtStatus, data: gtData,
  } = useDepenTree(name, data?.parsedVer, (change: ChangeRecord) => {
    if (change[0].changeType === 'add' && change[0].node) {
      setNodeCount((count) => count + 1);
    }
  });

  useEffect(() => () => {
    // Cleanup
    setNodeCount(0);
    if (gtData) {
      if (gtData.graph) gtData.graph = null;
      if (gtData.tree) gtData.tree = null;
    }
  }, [packageName]);

  return (
    <div className={className}>
      <Card shadow type={error || (status !== 'loading' && !data.foundVer) ? 'error' : 'default'}>
        <div className="flex">
          <h3 className="font-bold">{`${name}@${status === 'success' && data.foundVer ? data.parsedVer : version}`}</h3>
          {(isFetching || status === 'loading') && <Spinner className="self-center ml-4" />}
        </div>
        {(status === 'error' || (status !== 'loading' && !data.foundVer)) && <p>Failed to find package</p>}
        {(status === 'success' && data.foundVer)
        && (
          <>
            <div className="flex flex-row">
              <div className="flex flex-col flex-grow">
                <p className="text-sm m-0">{data.description}</p>
                <div className="flex flex-row">
                  <p className="uppercase text-gray-600 text-sm font-bold">Dependencies</p>
                  <div className="flex items-center ml-2">
                    <div className="flex">
                      {(gtStatus === 'loading' && nodeCount !== 0) && <Badge>{nodeCount}</Badge>}
                      {(gtData && gtStatus === 'success')
                        ? (
                          <Badge>
                            {gtData?.graph.getNodesCount()}
                          </Badge>
                        ) : <Spinner className="ml-1" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                {
              gtStatus === 'success'
                ? (
                  <ExportData graph={gtData?.graph} />
                )
                : (
                  <>
                    <Spinner />
                  </>
                )
            }
              </div>
            </div>
          </>
        )}
      </Card>
      { showDisplay && status === 'success' && data.foundVer
        ? (
          <Tabs initialValue="file-tree" className="mt-4">
            <Tabs.Item label="File-Tree" value="file-tree">
              {gtStatus === 'loading' && <Loading size="large" />}
              {(gtStatus === 'success' && data.foundVer && gtData && gtData.graph && gtData.graph.getNodesCount() < Config.maxDependCount)
                && <OutputFileTree tree={gtData!.tree} />}
              {(gtStatus === 'success' && data.foundVer && gtData && gtData.graph && gtData.graph.getNodesCount() >= Config.maxDependCount)
                && <p>Too many dependencies to display file-tree.</p>}
            </Tabs.Item>
            <Tabs.Item label="Bullets" value="bullets">
              {gtStatus === 'loading' && <Loading size="large" />}
              {(gtStatus === 'success' && data.foundVer && gtData && gtData.graph && gtData.graph.getNodesCount() < Config.maxDependCount)
                && <OutputBullets tree={gtData!.tree} />}
              {(gtStatus === 'success' && data.foundVer && gtData && gtData.graph && gtData.graph.getNodesCount() >= Config.maxDependCount)
                && <p>Too many dependencies to display file-tree.</p>}
            </Tabs.Item>
          </Tabs>
        )
        : (status === 'loading') && <Loading size="large" />}
    </div>
  );
}

export { OutputDisplay };
