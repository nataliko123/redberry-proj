"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./CustomSelect.module.css";
import ChooseButton from "../Buttons/ChooseButton/ChooseButton";
import UserCheckbox from "../UserCheckbox/UserCheckbox";
import Image from "next/image";

const CustomSelect = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [checkedStates, setCheckedStates] = useState<boolean[][]>([]);

  const optionsList = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  // 🧪 Mocked static data
  const categories = [
    { id: 1, name: "მარკეტინგი" },
    { id: 2, name: "დეველოპმენტი" },
    { id: 3, name: "HR" },
  ];

  const ratings = [
    { id: 1, name: "მაღალი" },
    { id: 2, name: "საშუალო" },
    { id: 3, name: "დაბალი" },
  ];

  const employees = [
    { id: 1, name: "ნატალი" },
    { id: 2, name: "ნიკოლოზი" },
    { id: 3, name: "საბა" },
  ];

  useEffect(() => {
    setCheckedStates([
      new Array(categories.length).fill(false),
      new Array(ratings.length).fill(false),
      new Array(employees.length).fill(false),
    ]);
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
            categories.map((category, idx) => (
              <UserCheckbox
                key={category.id}
                checked={checkedStates[0]?.[idx]}
                onClick={() => updateCheckbox(0, idx)}
                label={category.name}
              />
            ))
          ) : expandedIndex === 1 ? (
            ratings.map((rating, idx) => (
              <UserCheckbox
                key={rating.id}
                checked={checkedStates[1]?.[idx]}
                onClick={() => updateCheckbox(1, idx)}
                label={rating.name}
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
