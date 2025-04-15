// components/TaskList.tsx
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";

type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
  };
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: "დაბალი" | "საშუალო" | "მაღალი";
  };
  total_comments: number;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://momentum.redberryinternship.ge/api/tasks")
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  const getPriorityValue = (geoPriority: string) => {
    switch (geoPriority) {
      case "მაღალი":
        return "high";
      case "საშუალო":
        return "medium";
      case "დაბალი":
        return "low";
      default:
        return "low";
    }
  };

  return (
    <div>
      {loading && <p>Loading tasks...</p>}
      {tasks.map(task => (
        <Card
          key={task.id}
          taskName={task.name}
          description={task.description}
          dueDate={new Date(task.due_date).toLocaleDateString("ka-GE", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          departmentName={task.department.name}
          employee={{
            name: task.employee.name,
            surname: task.employee.surname,
            avatar: task.employee.avatar,
          }}
          totalComments={task.total_comments}
          priority={getPriorityValue(task.priority.name)}
          color="pink" // You can change this later based on dept or something
          border="pink" // Same as above
        />
      ))}
    </div>
  );
};

export default TaskList;
