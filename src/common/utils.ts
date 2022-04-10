export function errorWrap(handler: (...args: any) => any) {
  return async (...args: any) => {
    try {
      await handler(...args);
    } catch (e) {
      args[args.length - 1](e);
    }
  };
}
