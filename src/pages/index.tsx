import React, { useState } from 'react';

import { PackageInput } from '../components/input/PackageInput';
import { OutputDisplay } from '../components/output/OutputDisplay';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

function Index() {
  const [packageName, setPackageName] = useState('');

  return (
    <Main
      meta={(
        <Meta
          title="NPM Dependency Generator"
          description="Generates a list of dependencies for npm packages."
        />
    )}
    >

      <PackageInput onSelected={(pckg) => setPackageName(pckg)} />
      { packageName
      && <OutputDisplay packageName={packageName} className="mt-4" /> }
    </Main>
  );
}

export default Index;
