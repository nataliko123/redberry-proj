"use client";
import React from "react";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import AddEmployeeButton from "./components/Buttons/AddToEmployeeButton/Button";
import CustomButton from "./components/Buttons/CustomButton/CustomButton";
import PriorityButton from "./components/Buttons/PriorityButtons/PriorityButtons";
import ReplyButton from "./components/Buttons/ReplyButton/ReplyButton";
import ChooseButton from "./components/Buttons/ChooseButton/ChooseButton";
import UserCheckbox from "./components/UserCheckbox/UserCheckbox";
import UserListItem from "./components/UserListItem/UserListItem";
import ProgressButton from "./components/Buttons/ProgressButton/ProgressButton";
import Card from "./components/Card/Card";
import NameFilter from "./components/NameFilter/NameFilter";
import InputField from "./components/InputField/InputField";
export default function Home() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column" }}>
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
        <UserCheckbox imageSrc="/Coworker.png" label="მარკეტინგის დეპარტამენტი" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <UserListItem imageUrl="/user.jpg" name="თამარ კვანტალია" />
      </div>
      <div>
      <NameFilter name="გიორგი გიორგაძე" />
    </div>
      <div style={{ display: "flex",  gap: "30px", flexDirection:"column"  }}>
      <div style={{ display: "flex", gap: "52px",  }}>
      <ProgressButton text="დასაწყები" color="yellow" />
      <ProgressButton text="პროგრესში" color="orange" />
      <ProgressButton text="მზად ტესტირებისთვის" color="pink" />
      <ProgressButton text="დასრულებული" color="blue" />
    </div>
    <div>
      <div style={{ display: "flex", gap: "52px", flexWrap: "wrap" }}>
      <Card priority="medium" color="pink" border="yellow" />
      <Card priority="high" color="pink" border="orange" />
      <Card priority="high" color="yellow" border="pink" />
      <Card priority="high" color="orange" border="blue" />
      
      <Card priority="high" color="pink" border="yellow" />
      <Card priority="low" color="orange" border="orange" />
      <Card priority="high" color="pink" border="pink" />
      <Card priority="low" color="pink" border="blue" />

      <Card priority="high" color="yellow" border="yellow" />
      <Card priority="high" color="blue" border="orange" />
      <Card priority="medium" color="pink" border="pink" />
      <Card priority="high" color="blue" border="blue" />

      <Card priority="high" color="blue" border="yellow" />
      <Card priority="high" color="pink" border="orange" />
      <Card priority="medium" color="yellow" border="pink" />
      <Card priority="high" color="pink" border="blue" />
      </div>
    </div>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <InputField />
    </div>
    </>
  );
}
