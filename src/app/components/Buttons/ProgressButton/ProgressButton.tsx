import clsx from "clsx";
import React from "react";
import styles from "./ProgressButton.module.css";

type Color = "yellow" | "orange" | "pink" | "blue";

type Props = {
  color: Color;
};

const getColorText = (color: Color) => {
  switch (color) {
    case "yellow":
      return { text: "დასრულებული" };
    case "orange":
      return { text: "მიმდინარე" };
    case "pink":
      return { text: "დასაწყები" };
    case "blue":
      return { text: "მზად ტესტირებისთვის" };
    default:
      return { text: "დასაწყები" };
  }
};

const ProgressButton: React.FC<Props> = ({ color }) => {
  const { text } = getColorText(color);
  return <button className={clsx(styles.progressButton, styles[color])}>{text}</button>;
};

export default ProgressButton;
