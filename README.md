use-reducer-effect-example
===

useReducer と useEffect フックを使って非同期処理をするサンプル
※ サンプルなので動かしはしていません

`src/hooks/useTasks` にカスタムフックとし置いてある

## feature

直接 useEffect を使うことはなくて、 useCmd を使うことで
 reducer で非同期関数やその他必要なものを effect に set すれば勝手に非同期が走る

```ts
// reducer
  const patch = (diff: Partial<State>): State => ({
    ...state,
    effect: undefined,
    ...diff,
  });

 switch (action.type) {
    case ActionType.GetTask:
      return patch({
        isLoading: true,
        effect: {
          cmd: fetchTasks, // Promise を返す非同期関数
          args: [], // ↑の引数
          successActionCreater: onTaskLoaded, // Promise が成功したときの action creator
          failureActionCreater: onFailure, // catch で渡される action creator
        }
      });

// custom hooks effect に与えた非同期処理をいい感じ感じに実行してくれる
const [{ effect, ...state }, dispatch] = useReducer(reducer, initialState);

useCmd<typeof Cmd, Action>(dispatch, effect);
```

型定義はこんな感じ。

```ts
export type Effect<T extends (...params: any[]) => Promise<any>, Action> =
T extends (...params: infer Params) => Promise<infer Result> ? {
    cmd: T;
    args: Params;
    successActionCreater: (result: Result) => Action;
    failureActionCreater: (error: Error) => Action;
  } : never;
```

