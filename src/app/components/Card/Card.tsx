import React from "react";
import Styles from "./Card.module.css"; // Change file name to Card.module.css
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

const Card = ({ priority, color, border }: Props) => { // Changed from Task to Card
  return (
    <div className={clsx(Styles.card, Styles[border])}> {/* Updated class name */}
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <PriorityButtons priority={priority} size="small"></PriorityButtons>
          <CustomButton color={color} text={"დიზაინი"}></CustomButton>
        </div>
        <div className={Styles.date}>22 იანვ, 2022</div>
      </div>
      <div className={Styles.middle}>
        <h2>Redberry-ს საიტის ლენდინგის დიზაინი</h2>
        <p>
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </div>
      <div className={Styles.bottom}>
        <img src="/Ellipse 3892.png" alt="" />
        <div className={Styles.comments}>
          <img src="/Comments.png" alt="" />
          <p>8</p>
        </div>
      </div>
    </div>
  );
};

export default Card; // Export Card component instead of Task
