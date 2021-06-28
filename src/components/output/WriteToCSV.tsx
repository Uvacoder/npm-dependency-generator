type WriteToCSVOutput = {
  data: any,
};

function writeToCsv(graph: any) : WriteToCSVOutput {
  const csvData = [['NAME', 'VERSION', 'LICENSE', 'DIST URL']];

  graph.forEachNode((node: any) => {
    csvData.push([
      node.data.name,
      node.data.version,
      node.data.license,
      node.data.dist.tarball,
    ]);
  });

  return {
    data: csvData,
  };
}

export { writeToCsv };
