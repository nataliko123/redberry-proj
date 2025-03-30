import React from "react";
import styles from "./Columns.module.css";
import Column from "../Column/Column";

type Props = {};

const Lines = (props: Props) => {
  return (
    <div className={styles.columns}>
      <Column color="yellow"></Column>
      <Column color="orange"></Column>
      <Column color="pink"></Column>
      <Column color="blue"></Column>
    </div>
  );
};

export default Lines;
