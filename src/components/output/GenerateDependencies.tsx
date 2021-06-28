import axios from 'axios';

const createGraphBuilder = require('npmgraphbuilder');

type BuildGraphReturn = {
  success: boolean,
  graph?: any,
  error?: any,
};

type ChangeRecord = {
  changeType: 'add' | 'remove' | 'update',
  node?: any,
  link?: any,
}[];

async function buildGraph(packageName: string, version: string, graph: any)
  : Promise<BuildGraphReturn> {
  // eslint-disable-next-line global-require
  // const graph = require('ngraph.graph')({ uniqueLinkId: false });
  const graphBuilder = createGraphBuilder((url: string) => axios.get(url), 'https://registry.npmjs.cf/');
  let success = false;
  let resultError = null;

  // graph.on('changed', onChange);
  await graphBuilder.createNpmDependenciesGraph(packageName, graph, version)
    .then(() => {
    }, (err: any) => {
      success = false;
      resultError = err;
    });
  console.log('returning graph!');
  return {
    success,
    graph,
    error: resultError,
  };
}

type BuildGraphNonReturn = {
  graph: any,
};

function createGraph(onChange?: (changes: ChangeRecord) => void): BuildGraphNonReturn {
  // eslint-disable-next-line global-require
  const graph = require('ngraph.graph')({ multigraph: false });
  graph.on('changed', onChange);
  return {
    graph,
  };
}

export {
  buildGraph, createGraph,
};
