import React from "react";
import Styles from "./Card.module.css";
import { clsx } from "clsx";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import PriorityButtons from "../Buttons/PriorityButtons/PriorityButtons";
import Image from "next/image";

type Props = {
  priority: "high" | "medium" | "low";
  color: "pink" | "orange" | "blue" | "yellow";
  border: "pink" | "orange" | "blue" | "yellow";
  taskName: string;
  description: string;
  dueDate: string;
  employee?: {
    name: string;
    surname: string;
    avatar: string;
  };
  totalComments: number;
  departmentName: string;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return ""; // Fallback
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // Invalid date
  const months = [
    "იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ",
    "ივლ", "აგვ", "სექ", "ოქტ", "ნოემ", "დეკ"
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const Card = ({
  priority,
  color,
  border,
  taskName,
  description,
  dueDate,
  employee,
  totalComments,
  departmentName,
}: Props) => {
  return (
    <div className={clsx(Styles.card, Styles[border])}>
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <PriorityButtons priority={priority} size="small" />
          <CustomButton color={color} text={departmentName} />
        </div>
        <div className={Styles.date}>{formatDate(dueDate)}</div>
      </div>

      <div className={Styles.middle}>
        <h2>{taskName}</h2>
        <p>{description}</p>
      </div>

      <div className={Styles.bottom}>
        {employee?.avatar ? (
          <Image
            src={employee.avatar}
            alt={`${employee.name} ${employee.surname}`}
            width={32}
            height={32}
            className={Styles.avatar}
          />
        ) : (
          <div className={Styles.avatarPlaceholder}></div>
        )}

        <div className={Styles.comments}>
          <Image src="/Comments.png" alt="comments" width={16} height={16} />
          <p>{totalComments}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
