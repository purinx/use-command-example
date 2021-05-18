import { useEffect, Dispatch } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Effect<T extends (...params: any[]) => Promise<any>, Action> =
T extends (...params: infer Params) => Promise<infer Result> ? {
    cmd: T;
    args: Params;
    successActionCreater: (result: Result) => Action;
    failureActionCreater: (error: Error) => Action;
  } : never;

export default <
  Cmd extends { [key: string]: (...params: any) => Promise<any> }, // eslint-disable-line
  Action,
>(dispatch: Dispatch<Action>, effect?: Effect<Value<Cmd>, Action>): void => {
  useEffect(() => {
    if (effect) {
      const { cmd, args, successActionCreater, failureActionCreater } = effect;
      cmd(...args)
        .then(result => dispatch(successActionCreater(result)))
        .catch(error =>dispatch(failureActionCreater(error)));
    }
  });
};
