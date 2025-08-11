import { ToTimeStampPipe } from './to-time-stamp.pipe';

describe('ToTimeStampPipe', () => {
  it('create an instance', () => {
    const pipe = new ToTimeStampPipe();
    expect(pipe).toBeTruthy();
  });
});
