const cache = new Map();

function generateFileTree(graph: any, rootID: string, fileTree: any[]) {
  const node = graph.getNode(rootID);
  const { data } = node;
  const { dependencies } = data;

  if (cache.has(node.id)) {
    fileTree.push(cache.get(node.id));
    return;
  }

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

  if (!dependencies
    || Object.keys(dependencies).length === 0) {
    const newObj = {
      type: 'file',
      name: node.id,
      extra: data.license,
    };
    fileTree.push(newObj);
    cache.set(node.id, newObj);
  } else {
    const depenArr : any[] = [];
    graph.forEachLinkedNode(rootID, (linkedNode: any, _link: any) => {
      generateFileTree(graph, linkedNode.id, depenArr);
    }, true);
    const newObj = {
      type: 'directory',
      name: node.id,
      extra: data.license,
      files: depenArr,
    };
    fileTree.push(newObj);
    cache.set(node.id, newObj);
  }
}

export { generateFileTree };
