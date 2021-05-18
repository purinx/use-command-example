import { Task } from 'types';

import * as Cmd from './api';
import { Effect } from '../useCmd';

export enum ActionType {
  CreateNewTask = 'createNewTask',
  Failure = 'failure',
  GetTask = 'get-task',
  OnChangeNewTask = 'on-change-new-task',
  PostSuccess = 'post-success',
  PostTask = 'post-task',
  TaskLoaded = 'task-loaded',
}

export type Action =
  | { type: ActionType.GetTask }
  | { type: ActionType.PostTask }
  | { type: ActionType.TaskLoaded, tasks: Task[] }
  | { type: ActionType.PostSuccess }
  | { type: ActionType.Failure, message?: string }
  | { type: ActionType.CreateNewTask }
  | { type: ActionType.OnChangeNewTask, diff: Partial<Task> }
  ;

export type State = {
  tasks: readonly Task[];
  newTask?: Task;
  isLoading: boolean;
  effect?: Effect<Value<typeof Cmd>, Action>;
};

export type Handlers = {
  onSubmitTask: () => void;
  onChangeNewTask: (diff: Partial<Task>) => void;
};
