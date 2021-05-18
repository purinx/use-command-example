import { DateTime } from 'luxon';

import { State, Action, ActionType } from './types';
import { fetchTasks, postTask } from './api';
import { onTaskLoaded, onFailure, onPostSuccess } from './actionCreators';

export default (state: State, action: Action): State => {
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
          cmd: fetchTasks,
          args: [],
          successActionCreater: onTaskLoaded,
          failureActionCreater: onFailure,
        }
      });
    case ActionType.TaskLoaded:
      return patch({
        isLoading: false,
        tasks: action.tasks,
      });
    case ActionType.PostTask:
      if (!state.newTask) {
        alert('なんかおかしいゾ');
        return state;
      }
      return patch({
        isLoading: true,
        effect: {
          cmd: postTask,
          args: [state.newTask],
          successActionCreater: onPostSuccess,
          failureActionCreater: onFailure,
        }
      });
    case ActionType.Failure:
      alert(action.message ?? 'なんかおかしいゾ');
      return patch({ isLoading: false });
    case ActionType.PostSuccess:
      alert('タスクが追加されました');
      // タスクが追加されたらタスク一覧を再読み込みする
      return patch({
        effect: {
          cmd: fetchTasks,
          args: [],
          successActionCreater: onTaskLoaded,
          failureActionCreater: onFailure,
        }
      });
    case ActionType.OnChangeNewTask:
      if (!state.newTask) {
        alert('なんかおかしいゾ');
        return state;
      }
      return patch({ newTask: { ...state.newTask, ...action.diff } });
    case ActionType.CreateNewTask:
      return patch({
        newTask: {
          title: '',
          description: '',
          deadLine: DateTime.local().toFormat('yyyy年MM月dd日 HH時mm分')
        }
      });
  }
};
