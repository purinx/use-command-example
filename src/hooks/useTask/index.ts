import { useReducer, useCallback } from 'react';

import { State, Handlers, Action, ActionType } from './types';
import reducer from './reducer';
import * as Cmd from './api';
import { onTaskLoaded, onFailure } from './actionCreators';
import useCmd from 'hooks/useCmd';

const initialState: State = {
  tasks: [],
  isLoading: true,
  effect: {
    args: [],
    cmd: Cmd.fetchTasks,
    failureActionCreater: onFailure,
    successActionCreater: onTaskLoaded,
  }
};

export default (): [Omit<State, 'effect'>, Handlers] => {
  const [{ effect, ...state }, dispatch] = useReducer(reducer, initialState);

  // effect に渡された非同期処理をいい感じに実行してくれる
  useCmd<typeof Cmd, Action>(dispatch, effect);

  const handlers: Handlers = {
    onChangeNewTask: useCallback(diff => {
      return dispatch({ type: ActionType.OnChangeNewTask, diff });
    }, []),
    onSubmitTask: useCallback(() => {
      return dispatch({ type: ActionType.PostTask });
    }, []),
  };
  return [state, handlers];
};
