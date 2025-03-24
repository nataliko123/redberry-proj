import React from "react";
import styles from "./ChooseButton.module.css";

const ChooseButton = (props: any) => {
  return (
    <div>
      <button className={styles.Choosebutton}>{props.title}</button>
    </div>
  );
};

export default ChooseButton;
