const FIRST_TIME_MS_DEFAULT = -1;

export class DoubleChecker {
  public debounceTimeMs: number;
  private timeout: NodeJS.Timeout | undefined;
  private isDouble: boolean = false;
  private firstTimeMs: number = FIRST_TIME_MS_DEFAULT;

  constructor(debounceTimeMs: number) {
    this.debounceTimeMs = debounceTimeMs;
    this.reset();
  }

  public emit(): boolean {
    if (this.isDouble) {
      // on 3rd emit;
      this.reset();
    }
    if (!this.timeout) {
      this.timeout = setTimeout(this.reset.bind(this), this.debounceTimeMs);
    }
    const currentMs = Date.now();
    if (this.firstTimeMs === FIRST_TIME_MS_DEFAULT) {
      // on 1st emit;
      this.firstTimeMs = currentMs;
      return false;
    }
    if (currentMs - this.firstTimeMs < this.debounceTimeMs) {
      // on 2nd emit;
      this.isDouble = true;
      return true;
    }
    // out of the check window;
    return false;
  }

  private reset() {
    this.isDouble = false;
    this.firstTimeMs = FIRST_TIME_MS_DEFAULT;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}
