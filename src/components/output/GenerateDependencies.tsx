import axios from 'axios';

const createGraphBuilder = require('npmgraphbuilder');

type BuildGraphReturn = {
  success: boolean,
  graph?: any,
  error?: any,
};

async function buildGraph(packageName: string, version: string): Promise<BuildGraphReturn> {
  // eslint-disable-next-line global-require
  const graph = require('ngraph.graph')({ uniqueLinkId: false });
  const graphBuilder = createGraphBuilder((url: string) => axios.get(url), 'https://registry.npmjs.cf/');
  let success = false;
  let resultGraph = null;
  let resultError = null;

  await graphBuilder.createNpmDependenciesGraph(packageName, graph, version)
    .then((resGraph: { getNodesCount: () => any; getLinksCount: () => any; }) => {
      resultGraph = resGraph;
    }, (err: any) => {
      success = false;
      resultError = err;
    });
  return {
    success,
    graph: resultGraph,
    error: resultError,
  };
}

export {
  buildGraph,
};
