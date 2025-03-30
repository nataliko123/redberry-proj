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
  const [categories, setCategories] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

  const optionsList = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  async function retrieveData() {
    try {
      const [categoriesRes, ratingsRes] = await Promise.all([
        fetch("https://momentum.redberryinternship.ge/api/departments"),
        fetch("https://momentum.redberryinternship.ge/api/priorities"),
      ]);

      if (!categoriesRes.ok) {
        throw new Error("Failed to fetch categories");
      }
      if (!ratingsRes.ok) {
        throw new Error("Failed to fetch ratings");
      }

      const categoriesData = await categoriesRes.json();
      const ratingsData = await ratingsRes.json();

      setCategories(categoriesData);
      setRatings(ratingsData);

      setCheckedStates([
        new Array(categoriesData.length).fill(false),
        new Array(ratingsData.length).fill(false),
        [],
      ]);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setCurrentIndex(index === currentIndex ? null : index);
  };

  const updateCheckbox = (categoryIndex: number, itemIndex: number) => {
    setCheckedStates((prev) => {
      const updated = prev.map((arr, i) =>
        i === categoryIndex ? arr.map((val, j) => (j === itemIndex ? !val : val)) : arr
      );
      return updated;
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
          alt="info icon"
          width={24}
          height={24}
        />
          </div>
        </div>
      ))}

      {expandedIndex !== null && (
        <div className={styles.customDropdownList}>
          {expandedIndex === 0 && categories.length > 0 ? (
            categories.map((category, idx) => (
              <UserCheckbox
                key={idx}
                checked={checkedStates[0][idx]}
                onClick={() => updateCheckbox(0, idx)}
                label={category.name}
              />
            ))
          ) : expandedIndex === 1 && ratings.length > 0 ? (
            ratings.map((rating, idx) => (
              <UserCheckbox
                key={idx}
                checked={checkedStates[1][idx]}
                onClick={() => updateCheckbox(1, idx)}
                label={rating.name}
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
