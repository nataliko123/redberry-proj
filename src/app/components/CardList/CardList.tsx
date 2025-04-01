import React from "react";
import Styles from "./Card.module.css";
import { clsx } from "clsx";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import PriorityButtons from "../Buttons/PriorityButtons/PriorityButtons";

type Border = "pink" | "orange" | "blue" | "yellow";
type Priority = "დაბალი" | "საშუალო" | "მაღალი"; // Using actual API strings
type Color = "pink" | "orange" | "blue" | "yellow";

type TaskData = {
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
    department: {
      id: number;
      name: string;
    };
  };
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: Priority;
    icon: string;
  };
  total_comments: number;
};

type CardProps = {
  taskData: TaskData;
  border: Border;
  color: Color;
};

const Card = ({ taskData, border, color }: CardProps) => {
  const avatarSrc = taskData.employee.avatar || "/Ellipse 3892.png";
  const fullName = `${taskData.employee.name} ${taskData.employee.surname}`;

  return (
    <div className={clsx(Styles.card, Styles[border])}>
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <PriorityButtons 
            priority={taskData.priority.name.toLowerCase() as Priority} 
            size="small" 
          />
          <CustomButton 
            color={color} 
            text={taskData.department.name} 
          />
        </div>
        <div className={Styles.date}>
          {new Date(taskData.due_date).toLocaleDateString()}
        </div>
      </div>
      <div className={Styles.middle}>
        <h2>{taskData.name}</h2>
        <p>{taskData.description}</p>
      </div>
      <div className={Styles.bottom}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={avatarSrc}
            alt="Employee Avatar"
            style={{
              marginRight: "10px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
            {fullName}
          </span>
        </div>
        <div className={Styles.comments}>
          <img src="/Comments.png" alt="Comments" />
          <p>{taskData.total_comments}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
