import React, { useState } from 'react';

import { AutoComplete, Button } from '@geist-ui/react';
import axios from 'axios';

interface ServerResponse {
  objects: Array<PackageResponse>
}

type PackageResponse = {
  package: PackageData
};

type PackageData = {
  name: string
};

type InputProps = {
  onSelected?: (packageName: string) => void;
};

function PackageInput({ onSelected } : InputProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState<Array<{ label: string; value: string; }>>();
  const searchHandler = (currentValue : string) => {
    setSelectedValue(currentValue);
    if (!currentValue) return setOptions([]);
    axios.get<ServerResponse>(
      `https://registry.npmjs.org/-/v1/search?size=10&from=0&text=${currentValue}`,
    ).then((repsonse) => {
      const { data } = repsonse;
      const entries = data.objects.map((pckg: PackageResponse) => (
        {
          label: pckg.package.name,
          value: pckg.package.name,
        }
      ));
      setOptions(entries);
    });
    return null;
  };
  return (
    <div className="flex">
      <AutoComplete
        clearable
        size="large"
        width="100%"
        options={options}
        placeholder="NPM Package Name"
        onSearch={searchHandler}
        className="flex-grow"
      />
      <Button
        auto
        type="secondary"
        className="ml-4"
        onClick={onSelected ? () => onSelected(selectedValue) : undefined}
      >
        Generate

      </Button>
    </div>
  );
}

export { PackageInput };
