function generateFileTree(graph: any, rootID: string, fileTree: any[]) {
  const node = graph.getNode(rootID);
  const { data } = node;
  const { dependencies } = data;

  console.log(data);
  if (!dependencies
    || Object.keys(dependencies).length === 0) {
    fileTree.push({
      type: 'file',
      name: node.id,
      extra: data.license,
    });
  } else {
    const depenArr : any[] = [];
    graph.forEachLinkedNode(rootID, (linkedNode: any, _link: any) => {
      generateFileTree(graph, linkedNode.id, depenArr);
    }, true);
    fileTree.push({
      type: 'directory',
      name: node.id,
      extra: data.license,
      files: depenArr,
    });
  }
}

export { generateFileTree };
