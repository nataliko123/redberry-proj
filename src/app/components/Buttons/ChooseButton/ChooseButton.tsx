


import React from "react";
import styles from "./ChooseButton.module.css";

type Props = {
  text: string;
};

const ChooseButton = ({ text }: Props) => {
  return <div className={styles.Choosebutton}>{text}</div>;
};

export default ChooseButton;
