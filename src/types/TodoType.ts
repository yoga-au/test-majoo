export enum TodoStatus {
  NOT_DONE,
  DONE,
}

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
}

type TodoType = TodoItem[];

export default TodoType;
