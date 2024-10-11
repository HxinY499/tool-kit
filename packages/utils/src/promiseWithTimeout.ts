export default function promiseWithTimeout<T>(
  promise: Promise<T>,
  timeout: number,
  timeoutValue: any = new Error('Operation timed out')
): Promise<T> {
  let timeoutId: any = null;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId!);
      reject(timeoutValue);
    }, timeout);
  });

  return Promise.race([promise, timeoutPromise])
    .then(result => result)
    .catch(reason => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      throw reason;
    });
}
