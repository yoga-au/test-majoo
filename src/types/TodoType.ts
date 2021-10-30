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

interface TodoType {
  data: TodoItem[];
}

export default TodoType;
