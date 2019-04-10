import { DoubleChecker } from '../src/double-checker';

describe('Test DoubleChecker', () => {
  let checker: DoubleChecker;

  beforeEach(() => {
    checker = new DoubleChecker(300);
  });

  it('should emit true at odd time', async () => {
    const firstOutput = checker.emit();
    expect(firstOutput).toEqual(false);
    await new Promise(resolve => setTimeout(resolve, 50));
    const secondOutput = checker.emit();
    expect(secondOutput).toEqual(true);
  });

  it('should emit false when timeout', async () => {
    const firstOutput = checker.emit();
    expect(firstOutput).toEqual(false);
    await new Promise(resolve => setTimeout(resolve, 300));
    const secondOutput = checker.emit();
    expect(secondOutput).toEqual(false);
  });

  it('should emit false when thripple time', async () => {
    const firstOutput = checker.emit();
    expect(firstOutput).toEqual(false);
    await new Promise(resolve => setTimeout(resolve, 50));
    const secondOutput = checker.emit();
    expect(secondOutput).toEqual(true);
    await new Promise(resolve => setTimeout(resolve, 50));
    const thridOutput = checker.emit();
    expect(thridOutput).toEqual(false);
  });
});
