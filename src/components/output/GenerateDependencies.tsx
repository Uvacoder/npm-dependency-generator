import axios from 'axios';

const graph = require('ngraph.graph')({ uniqueLinkId: false });
const createGraphBuilder = require('npmgraphbuilder');

type BuildGraphReturn = {
  success: boolean,
  graph?: any,
  error?: any,
};

async function buildGraph(packageName: string, version: string): Promise<BuildGraphReturn> {
  const graphBuilder = createGraphBuilder((url: string) => axios.get(url), 'https://registry.npmjs.cf/');
  let success = false;
  let resultGraph = null;
  let resultError = null;

  await graphBuilder.createNpmDependenciesGraph(packageName, graph, version)
    .then((resGraph: { getNodesCount: () => any; getLinksCount: () => any; }) => {
      console.log('Done.');
      console.log('Nodes count: ', resGraph.getNodesCount());
      console.log('Edges count: ', resGraph.getLinksCount());
      resultGraph = resGraph;
    }, (err: any) => {
      console.error('Failed to build graph: ', err);
      success = false;
      resultError = err;
    });
  console.log('exit function');
  return {
    success,
    graph: resultGraph,
    error: resultError,
  };
}

export {
  buildGraph,
};
