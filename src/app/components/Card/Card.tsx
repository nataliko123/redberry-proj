// import React from "react";
// import Styles from "./Card.module.css"; // Change file name to Card.module.css
// import { clsx } from "clsx";
// import CustomButton from "../Buttons/CustomButton/CustomButton";
// import PriorityButtons from "../Buttons/PriorityButtons/PriorityButtons";
// import Image from "next/image";

// type Border = "pink" | "orange" | "blue" | "yellow";
// type Priority = "high" | "medium" | "low";
// type Color = "pink" | "orange" | "blue" | "yellow";
// type Props = {
//   priority: Priority;
//   color: Color;
//   border: Border;
// };

// const Card = ({ priority, color, border }: Props) => { // Changed from Task to Card
//   return (
//     <div className={clsx(Styles.card, Styles[border])}> {/* Updated class name */}
//       <div className={Styles.head}>
//         <div className={Styles.buttons}>
//           <PriorityButtons priority={priority} size="small"></PriorityButtons>
//           <CustomButton color={color} text={"დიზაინი"}></CustomButton>
//         </div>
//         <div className={Styles.date}>22 იანვ, 2022</div>
//       </div>
//       <div className={Styles.middle}>
//         <h2>Redberry-ს საიტის ლენდინგის დიზაინი</h2>
//         <p>
//           შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
//           ნავიგაციას.
//         </p>
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
import Image from "next/image";

type Border = "pink" | "orange" | "blue" | "yellow";
type Priority = "high" | "medium" | "low";
type Color = "pink" | "orange" | "blue" | "yellow";
type Props = {
  priority: Priority;
  color: Color;
  border: Border;
};

type TaskData = {
  id: number;
  priority: Priority;
  color: Color;
  border: Border;
  title: string;
  description: string;
  createdAt: string;
  comments: number;
};

const Card = ({ priority, color, border }: Props) => {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 9e8fc53a-04c7-4999-af88-b94216f671c4`, // Add the token here
            },
          }
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Validate that data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          setTaskData(data[0]); // Set the first task
        } else {
          setError("No tasks found in the response");
        }
      } catch (error) {
        // Handle fetch or parsing errors
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setIsLoading(false); // Stop loading, regardless of success or failure
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  // Render based on state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!taskData) {
    return <div>No task data available</div>;
  }

  return (
    <div className={clsx(Styles.card, Styles[taskData.border])}>
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <PriorityButtons priority={taskData.priority} size="small" />
          <CustomButton color={taskData.color} text={"დიზაინი"} />
        </div>
        <div className={Styles.date}>{taskData.createdAt}</div>
      </div>
      <div className={Styles.middle}>
        <h2>{taskData.title}</h2>
        <p>{taskData.description}</p>
      </div>
      <div className={Styles.bottom}>
        <img src="/Ellipse 3892.png" alt="" />
        <div className={Styles.comments}>
          <img src="/Comments.png" alt="" />
          <p>{taskData.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
