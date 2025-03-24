"use client";
import React from "react";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import AddEmployeeButton from "./components/Buttons/AddToEmployeeButton/Button";
import CustomButton from "./components/Buttons/CustomButton/CustomButton";
import PriorityButton from "./components/Buttons/PriorityButtons/PriorityButtons";
import ReplyButton from "./components/Buttons/ReplyButton/ReplyButton";

export default function Home() {
  return (
    <>
      <Header />
      <CustomButton />
      <PriorityButton priority="medium" size="small" />
      <PriorityButton priority="low" size="small" />
      <PriorityButton priority="high" size="small"></PriorityButton>
      <PriorityButton priority="medium" size="big" />
      <PriorityButton priority="low" size="big" />
      <PriorityButton priority="high" size="big"></PriorityButton>{" "}
      <ReplyButton />
    </>
  );
}
