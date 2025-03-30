import React from "react";
import Card from "../Card/Card";
import ProgressButton from "../Buttons/ProgressButton/ProgressButton";
import styles from "./Column.module.css";

type Color = "pink" | "orange" | "blue" | "yellow";
type Props = {
  color: Color;
};

const Column = ({ color }: Props) => {
  return (
    <div className={styles.column}>
      <ProgressButton color={color} />
      <Card priority="high" color="blue" border={color}></Card>
      <Card priority="low" color="yellow" border={color}></Card>
      <Card priority="medium" color="orange" border={color}></Card>
      <Card priority="high" color="pink" border={color}></Card>
    </div>
  );
};

export default Column;