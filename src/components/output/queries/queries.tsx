import axios from 'axios';
import { useQuery } from 'react-query';

import { Config } from '../../../utils/Config';
import { createGraph, buildGraph } from '../GenerateDependencies';
import { generateFileTree } from '../GenerateFileTree';

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
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 0,
  });
}

type ChangeRecord = {
  changeType: 'add' | 'remove' | 'update',
  node?: any,
  link?: any,
}[];

function useDepenTree(packageName: string, version: string,
  onChange?: (change: ChangeRecord) => void) {
  return useQuery(['graph', packageName, version], async () => {
    const { graph } = createGraph(onChange);
    await buildGraph(packageName, version, graph);
    const newTree: any = [];
    if (graph.getNodesCount() < Config.maxDependCount) {
      generateFileTree(graph, `${packageName}@${version}`, newTree);
    }
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
    cacheTime: 0,
  });
}

export { usePackage, useDepenTree };
