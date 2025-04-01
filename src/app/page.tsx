"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Column from "./components/Column/Column";
import Selects from "./components/CustomSelect/CustomSelect";
import Card from "./components/Card/Card";
import styles from "./page.module.css";

type Task = {
  id: number;
  priority: "high" | "medium" | "low";
  color: "pink" | "orange" | "blue" | "yellow";
  border: "pink" | "orange" | "blue" | "yellow";
  title: string;
  description: string;
  date: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/tasks", {
      method: "GET",
      headers: {
        "Authorization": `9e92a1dc-bd5f-4f23-9d08-8305a6fd4685`,  // Replace with your actual token
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check API response in console
        setTasks(data); // Store API data
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <>
      <Header />
      <div className={styles.header}>დავალებების გვერდი</div>
      <Selects />

      {/* Display Fetched Tasks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "40px",
          paddingInline: "20px",
        }}
      >
        {tasks.map((task) => (
          <Card
            key={task.id}
            priority={task.priority}
            color={task.color}
            border={task.border}
            title={task.title}
            description={task.description}
            date={task.date}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "52px",
          marginInline: "auto",
          width: "fit-content",
          marginTop: "79px",
        }}
      >
        <Column color={"yellow"} />
        <Column color={"orange"} />
        <Column color={"pink"} />
        <Column color={"blue"} />
      </div>
    </>
  );
}
