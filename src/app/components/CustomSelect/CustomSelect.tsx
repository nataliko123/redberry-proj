"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./CustomSelect.module.css";
import ChooseButton from "../Buttons/ChooseButton/ChooseButton";
import UserCheckbox from "../UserCheckbox/UserCheckbox";
import Image from "next/image";

type Department = { id: number; name: string };
type Priority = { id: number; name: string; icon: string };
type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
};


const CustomSelect = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [checkedStates, setCheckedStates] = useState<boolean[][]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const optionsList = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  const TOKEN = "9eae8d33-5b16-49b0-9722-fb6965f5ae2d";

  useEffect(() => {
    // Fetch departments
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setDepartments(data);
        setCheckedStates((prev) => [
          new Array(data.length).fill(false),
          prev[1] || [],
          prev[2] || [],
        ]);
      })
      .catch((error) => {
        console.error("Error fetching departments", error);
      });

    // Fetch priorities
    fetch("https://momentum.redberryinternship.ge/api/priorities")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setPriorities(data);
        setCheckedStates((prev) => [
          prev[0] || [],
          new Array(data.length).fill(false),
          prev[2] || [],
        ]);
      })
      .catch((error) => {
        console.error("Error fetching priorities", error);
      });

    // Fetch employees with authorization
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setCheckedStates((prev) => [
          prev[0] || [],
          prev[1] || [],
          new Array(data.length).fill(false),
        ]);
      })
      .catch((error) => {
        console.error("Error fetching employees", error);
      });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setCurrentIndex(index === currentIndex ? null : index);
  };

  const updateCheckbox = (categoryIndex: number, itemIndex: number) => {
    setCheckedStates((prev) =>
      prev.map((arr, i) =>
        i === categoryIndex
          ? arr.map((val, j) => (j === itemIndex ? !val : val))
          : arr
      )
    );
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.customSelectContainer} ref={containerRef}>
      {optionsList.map((text, index) => (
        <div key={index}>
          <div
            className={clsx(styles.customSelectButton, {
              [styles.activeState]: currentIndex === index,
            })}
            onClick={() => handleToggle(index)}
          >
            <p>{text}</p>
            <Image
              src="/arrow-down.png"
              alt="arrow icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      ))}

      {expandedIndex !== null && (
        <div className={styles.customDropdownList}>
          {expandedIndex === 0 ? (
            departments.map((department, idx) => (
              <UserCheckbox
                key={department.id}
                checked={checkedStates[0]?.[idx]}
                onClick={() => updateCheckbox(0, idx)}
                label={department.name}
              />
            ))
          ) : expandedIndex === 1 ? (
            priorities.map((priority, idx) => (
              <UserCheckbox
                key={priority.id}
                checked={checkedStates[1]?.[idx]}
                onClick={() => updateCheckbox(1, idx)}
                label={
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Image src={priority.icon} alt={priority.name} width={16} height={16} />
                    {priority.name}
                  </span>
                }
              />
            ))
          ) : expandedIndex === 2 ? (
            employees.map((employee, idx) => (
              <UserCheckbox
                key={employee.id}
                checked={checkedStates[2]?.[idx]}
                onClick={() => updateCheckbox(2, idx)}
                label={employee.name}
              />
            ))
          ) : (
            <p className={styles.noDataMessage}>მონაცემები არ არის</p>
          )}
          <ChooseButton text="არჩევა" />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
