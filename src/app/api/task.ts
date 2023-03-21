export interface ITask {
  _id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export enum TaskStatus {
  COMPLETED = 'completed',
  WAITING = 'waiting',
}
