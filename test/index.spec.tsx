import * as React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DoubleBucket from '../src/index';

type AnyFunc = (...args: any[]) => any;

describe('Test DoubleBucket', () => {
  let bucket: DoubleBucket;
  let singleCb: AnyFunc;
  let doubleCb: AnyFunc;

  beforeEach(() => {
    singleCb = sinon.spy();
    doubleCb = sinon.spy();
    bucket = new DoubleBucket(singleCb, doubleCb);
  });

  it('should call `singleCb`', () => {
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
  });

  it('should call `doubleCb` at odd time', async () => {
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));

    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);

    await new Promise(resolve => setTimeout(resolve, 50));
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 1);
  });

  it('should not call `doubleCb` when timeout', async () => {
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));

    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);

    await new Promise(resolve => setTimeout(resolve, 310));
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 0);
  });

  it('should `debounceTimeMs` work', async () => {
    bucket = new DoubleBucket(singleCb, doubleCb, { debounceTimeMs: 100 });
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));

    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);

    await new Promise(resolve => setTimeout(resolve, 110));
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 0);
  });
});
