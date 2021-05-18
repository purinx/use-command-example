import { Task } from 'types';
import { Action, ActionType } from './types';

export const onTaskLoaded = (tasks: Task[]): Action => ({
  type: ActionType.TaskLoaded,
  tasks,
});

export const onPostSuccess = (): Action => ({
  type: ActionType.PostSuccess,
});

export const onFailure = (error: Error): Action => ({
  type: ActionType.Failure,
  message: error.message,
});
