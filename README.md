# Double Bucket

> A wrapper of double event handler

[![building](https://travis-ci.com/superche/double-bucket.svg?branch=master)](https://travis-ci.com/superche/double-bucket) [![codecov](https://codecov.io/gh/superche/double-bucket/branch/master/graph/badge.svg)](https://codecov.io/gh/superche/double-bucket)

## Install

```sh
npm install --save double-bucket
```

## Usage

React.js example

```jsx
import * as DoubleBucket from 'double-bucket';

export default function DemoComponent() {
  const singleCb = () => console.log('on singleCb');
  const doubleCb = () => console.log('on doubleCb');
  const bucket = new DoubleBucket(singleCb, doubleCb, {
    debounceTimeMs: 300, // optional, default value is 300 ms
  });
  return `<button onClick={bucket.wrap}>Demo Button</button>`;
}
```

## License

MIT

