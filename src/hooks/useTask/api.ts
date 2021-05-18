import { Task } from 'types';

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`/api/tasks`);
  if (res.status !== 200) { throw new Error(); }
  return await res.json() as Task[];
};

export const postTask = async (newTask: Task): Promise<void> => {
  const res = await fetch(`/api/tasks`, {
    method: 'POST',
    body: JSON.stringify(newTask),
  });
  if (res.status !== 201) { throw new Error(); }
  return;
};
