import { DoubleChecker } from './double-checker';
import { AnyFunction, Options } from './typings.d';

export default class DoubleBucket {
  private checker: DoubleChecker;
  private singleCb: AnyFunction;
  private doubleCb: AnyFunction;

  constructor(singleCb: AnyFunction, doubleCb: AnyFunction, options: Options = {}) {
    const { debounceTimeMs = 300 } = options;
    this.checker = new DoubleChecker(debounceTimeMs);
    this.singleCb = singleCb;
    this.doubleCb = doubleCb;
  }

  public wrap = this.innerWrap.bind(this);

  private innerWrap(...args: any[]) {
    const isDouble = this.checker.emit();
    this.singleCb.apply(null, args);
    if (isDouble) {
      this.doubleCb.apply(null, args);
    }
  }
}
