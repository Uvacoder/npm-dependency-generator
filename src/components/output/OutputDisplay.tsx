import React from 'react';

import {
  Badge,
  Card, Loading, Spinner, Tabs,
} from '@geist-ui/react';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';

import { ExportData } from './ExportData';
import { buildGraph } from './GenerateDependencies';
import { generateFileTree } from './GenerateFileTree';
import { OutputBullets } from './OutputBullets';
import { OutputFileTree } from './OutputFileTree';

function usePackage(packageName: string, version: string) {
  return useQuery(['package', packageName, version], async () => {
    const { data } = await axios.get(`https://registry.npmjs.cf/${packageName}`);
    let parsedVer = version;
    let foundVer = true;
    if (version === 'latest') {
      const keys = Object.keys(data.versions);
      parsedVer = keys[keys.length - 1];
    } else if (!(version in data.versions)) {
      foundVer = false;
    }
    return {
      ...data,
      parsedVer,
      foundVer,
    };
  }, {
    retry: 1, refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false,
  });
}

function useDepenTree(packageName: string, version: string) {
  return useQuery(['graph', packageName, version], async () => {
    const { graph } = await buildGraph(packageName, version);
    const newTree: any[] = [];
    generateFileTree(graph, `${packageName}@${version}`, newTree);
    return {
      graph,
      tree: newTree,
    };
  }, {
    enabled: !!version,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

type OutputDisplayProps = React.HTMLAttributes<HTMLDivElement> & {
  packageName: string;
  className?: string
};

function OutputDisplay({ packageName, className } : OutputDisplayProps) {
  // eslint-disable-next-line no-useless-escape
  const regExp = /(@?\S+[^@])@([\d\.]+)?$/;
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

  const {
    status: gtStatus, data: gtData,
  } = useDepenTree(name, data?.parsedVer);

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
                    <div>
                      {gtData ? <Badge>{gtData?.graph.getNodesCount()}</Badge> : <Spinner />}
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
      { status === 'success' && data.foundVer
        ? (
          <Tabs initialValue="file-tree" className="mt-4">
            <Tabs.Item label="File-Tree" value="file-tree">
              {(gtStatus === 'success' && data.foundVer)
                ? <OutputFileTree tree={gtData!.tree} />
                : <Loading size="large" />}
            </Tabs.Item>
            <Tabs.Item label="Bullets" value="bullets">
              {(gtStatus === 'success' && data.foundVer)
                ? <OutputBullets tree={gtData!.tree} />
                : <Loading size="large" />}
            </Tabs.Item>
          </Tabs>
        )
        : (status === 'loading') && <Loading size="large" />}
    </div>
  );
}

export { OutputDisplay };