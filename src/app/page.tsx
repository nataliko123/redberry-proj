"use client";
import React from "react";
import Header from "./components/Header/Header";
// import CustomButton from "./components/Buttons/CustomButton/CustomButton";
// import PriorityButton from "./components/Buttons/PriorityButtons/PriorityButtons";
// import ReplyButton from "./components/Buttons/ReplyButton/ReplyButton";
// import ChooseButton from "./components/Buttons/ChooseButton/ChooseButton";
// import UserCheckbox from "./components/UserCheckbox/UserCheckbox";
// import UserListItem from "./components/UserListItem/UserListItem";
// import ProgressButton from "./components/Buttons/ProgressButton/ProgressButton";
// import Card from "./components/Card/Card";
// import NameFilter from "./components/NameFilter/NameFilter";
// import InputField from "./components/InputField/InputField";
import Column from "./components/Column/Column";
import Selects from "./components/CustomSelect/CustomSelect";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.header}>დავალებების გვერდი</div>
      <Selects></Selects>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <CustomButton color="pink" text="დიზაინი" />
        <CustomButton color="orange" text="მარკეტინგი" />
        <CustomButton color="blue" text="ლოგისტიკა" />
        <CustomButton color="yellow" text="ინფ.ტექ." />
      </div>
      <PriorityButton priority="medium" size="small" />
      <PriorityButton priority="low" size="small" />
      <PriorityButton priority="high" size="small"></PriorityButton>
      <PriorityButton priority="medium" size="big" />
      <PriorityButton priority="low" size="big" />
      <PriorityButton priority="high" size="big"></PriorityButton>{" "}
      <ReplyButton />
      <ChooseButton title="Button" />
      <div>
        <UserCheckbox
          imageSrc="/Coworker.png"
          label="მარკეტინგის დეპარტამენტი"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <UserListItem imageUrl="/user.jpg" name="თამარ კვანტალია" />
      </div>
      <div>
        <NameFilter name="გიორგი გიორგაძე" />
      </div> */}
      <div
        style={{
          display: "flex",
          gap: "52px",
          marginInline: "auto",
          width: "fit-content",
          marginTop: "79px",
        }}
      >
        <Column color={"yellow"}></Column>
        <Column color={"orange"}></Column>
        <Column color={"pink"}></Column>
        <Column color={"blue"}></Column>
      </div>
      {/* <div className="flex justify-center items-center h-screen bg-gray-100 ">
        <InputField label={""} minLength={2} maxLength={255} />
      </div> */}
    </>
  );
}
