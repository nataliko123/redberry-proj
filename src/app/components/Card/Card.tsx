// import React from "react";
// import Styles from "./Card.module.css"; // Change file name to Card.module.css
// import { clsx } from "clsx";
// import CustomButton from "../Buttons/CustomButton/CustomButton";
// import PriorityButtons from "../Buttons/PriorityButtons/PriorityButtons";
// import Image from "next/image";

// type Props = {
//   priority: any;
//   color: any
//   border: any;
//   title: string;
//   description: string;
//   date: string;
// };

// const Card = ({ priority, color, border, title, description, date }: Props) => {
//   return (
//     <div className={clsx(Styles.card, Styles[border])}>
//       <div className={Styles.head}>
//         <div className={Styles.buttons}>
//           <PriorityButtons priority={priority} size="small" />
//           <CustomButton color={color} text={"დიზაინი"} />
//         </div>
//         <div className={Styles.date}>{date}</div>
//       </div>
//       <div className={Styles.middle}>
//         <h2>{title}</h2>
//         <p>{description}</p>
//       </div>
//       <div className={Styles.bottom}>
//         <img src="/Ellipse 3892.png" alt="" />
//         <div className={Styles.comments}>
//           <img src="/Comments.png" alt="" />
//           <p>8</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card; // Export Card component instead of Task






import React, { useState, useEffect } from "react";
import Styles from "./Card.module.css";
import { clsx } from "clsx";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import PriorityButtons from "../Buttons/PriorityButtons/PriorityButtons";

type Border = "pink" | "orange" | "blue" | "yellow";
type Priority = "დაბალი" | "საშუალო" | "მაღალი"; // Using the actual API strings
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

type Props = {
  priority: Priority;
  color: Color;
  border: Border;
};

const Card = ({ priority, color, border }: Props) => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 9e8fc53a-04c7-4999-af88-b94216f671c4`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: TaskData[] = await response.json();
        console.log("Fetched Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          // Use first task for demo purposes
          setTaskData(data[0]);
        } else {
          throw new Error("No tasks found in the response");
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskData) {
    return <div>No task data available</div>;
  }

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
