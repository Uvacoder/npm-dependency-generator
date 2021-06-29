import React from 'react';

import { Tree } from '@geist-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Failed to render file-tree.</p>;
    }

    return this.props.children;
  }
}

type OutputFileTreeProps = {
  tree: any,
};

function OutputFileTree({ tree } : OutputFileTreeProps) {
  return (
    <ErrorBoundary>
      <Tree value={tree} />
    </ErrorBoundary>
  );
}

export { OutputFileTree };
