import { onEnter } from './AriaUtils';

describe('aria utils', () => {
  it('should call handler if handler is defined and key is enter', () => {
    const handler = jest.fn();
    const event = { key: 'Enter' };
    onEnter(handler)(event as React.KeyboardEvent<unknown>);
    expect(handler).toBeCalledWith(event);
  });
  it('should not call handler if handler is defined and key is not enter', () => {
    const handler = jest.fn();
    const event = { key: 'Escape' };
    onEnter(handler)(event as React.KeyboardEvent<unknown>);
    expect(handler).not.toBeCalled();
  });
  it('should not call handler if handler is not passed in and key is enter', () => {
    const handler = jest.fn();
    const event = { key: 'Enter' };
    onEnter(undefined)(event as React.KeyboardEvent<unknown>);
    expect(handler).not.toBeCalled();
  });
  it('should not call handler if handler is not passed in and key is not enter', () => {
    const handler = jest.fn();
    const event = { key: 'Escape' };
    onEnter(undefined)(event as React.KeyboardEvent<unknown>);
    expect(handler).not.toBeCalled();
  });
});
