function generateFileTree(graph: any, rootID: string, fileTree: any[]) {
  const node = graph.getNode(rootID);
  const { data } = node;
  const { dependencies } = data;

  // Some package nodes have an array of licenses instead of a single license key
  if (data.licenses) {
    let licenseStr = '';
    for (let i = 0; i < data.licenses.length; i += 1) {
      licenseStr += data.licenses[i].type;
      if (i !== data.licenses.length - 1) {
        licenseStr += ', ';
      }
    }
    data.license = licenseStr;
  }

  if (typeof node.id !== 'string') {
    console.log(node);
  }

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
