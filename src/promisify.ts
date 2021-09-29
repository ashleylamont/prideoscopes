const promisify = <Arguments, ReturnType>(
  fn: (args: Arguments, cb: (result: ReturnType) => void, errorCb: (error: Event) => void) => void,
) => ((args: Arguments): Promise<ReturnType> => new Promise((resolve, reject) => {
    fn(args, resolve, reject);
  })
  );
export default promisify;
