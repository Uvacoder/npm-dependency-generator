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
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
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
