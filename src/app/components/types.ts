export type TaskType = {
    id: number;
    name: string;
    description: string;
    due_date: string;
    department: {
      name: string;
    };
    employee: {
      name: string;
      surname: string;
      avatar: string;
    };
    status: {
      name: string;
    };
    priority: {
      name: "დაბალი" | "საშუალო" | "მაღალი";
      icon: string;
    };
    total_comments: number;
  };
  