import React from "react";
import AddToTaskButton from "../Buttons/AddToTaskButton/Button";
import AddToEmployeeButton from "../Buttons/AddToEmployeeButton/Button";
import styles from "./Header.module.css"
import clsx from "clsx"


const Header = () => {
  return (
    <header className={clsx(styles.header, styles.container)}>
      <img src="/logo.svg" alt="logo" />
      <div className={styles.buttonwrap}>
        <AddToEmployeeButton title={"თანამშრომლის შექმნა"}/>
        <AddToTaskButton title={"შექმენი ახალი დავალება"} />
      </div>
    </header>
  );
};

export default Header;
