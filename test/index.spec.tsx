import * as React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DoubleBucket from '../src/index';

type AnyFunc = (...args: any[]) => any;

function wait(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    await wait(50);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 1);

    await wait(300);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 3);
    expect(doubleCb).toHaveProperty('callCount', 1);
    await wait(50);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 4);
    expect(doubleCb).toHaveProperty('callCount', 2);
  });

  it('should not call `doubleCb` when timeout', async () => {
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));

    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);

    await wait(310);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 0);
  });

  it('should go back to normal when triple times', async () => {
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));
    // make a triple click
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 1);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 3);
    expect(doubleCb).toHaveProperty('callCount', 1);
    // wait
    await wait(310);
    // should go back to normal
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 4);
    expect(doubleCb).toHaveProperty('callCount', 1);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 5);
    expect(doubleCb).toHaveProperty('callCount', 2);
  });

  it('should `debounceTimeMs` work', async () => {
    bucket = new DoubleBucket(singleCb, doubleCb, { debounceTimeMs: 100 });
    const wrapper = bucket.wrap;
    const button = shallow((<button onClick={wrapper}>Ok!</button>));

    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 1);
    expect(doubleCb).toHaveProperty('callCount', 0);

    await wait(110);
    button.find('button').simulate('click');
    expect(singleCb).toHaveProperty('callCount', 2);
    expect(doubleCb).toHaveProperty('callCount', 0);
  });
});
