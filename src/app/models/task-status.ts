export class TaskStatus {
    statusUpdationDateTimeString: string;
  taskStatus?: { taskStatusName: string };
  User?: { userName: string };
  description: string;

  constructor(
    statusUpdationDateTimeString: string,
    description: string,
    taskStatus?: { taskStatusName: string },
    User?: { userName: string }
  ) {
    this.statusUpdationDateTimeString = statusUpdationDateTimeString;
    this.description = description;
    this.taskStatus = taskStatus;
    this.User = User;
  }
}
