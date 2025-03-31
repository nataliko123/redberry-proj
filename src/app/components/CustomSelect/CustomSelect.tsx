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
  const [employees, setEmployees] = useState<any[]>([]); // New state for employees
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const optionsList = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

  async function retrieveData() {
    try {
      setIsLoading(true);
      const [categoriesRes, ratingsRes, employeesRes] = await Promise.all([
        fetch("https://momentum.redberryinternship.ge/api/departments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8fc53a-04c7-4999-af88-b94216f671c4`, // Add token
          },
        }),
        fetch("https://momentum.redberryinternship.ge/api/priorities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8fc53a-04c7-4999-af88-b94216f671c4`,
          },
        }),
        fetch("https://momentum.redberryinternship.ge/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e8fc53a-04c7-4999-af88-b94216f671c4`,
          },
        }),
      ]);

      // Check if responses are successful
      if (!categoriesRes.ok) {
        throw new Error(`Failed to fetch categories: ${categoriesRes.status}`);
      }
      if (!ratingsRes.ok) {
        throw new Error(`Failed to fetch ratings: ${ratingsRes.status}`);
      }
      if (!employeesRes.ok) {
        throw new Error(`Failed to fetch employees: ${employeesRes.status}`);
      }

      const categoriesData = await categoriesRes.json();
      const ratingsData = await ratingsRes.json();
      const employeesData = await employeesRes.json();

      // Set the fetched data
      setCategories(categoriesData);
      setRatings(ratingsData);
      setEmployees(employeesData);

      // Initialize checkedStates for all three dropdowns
      setCheckedStates([
        new Array(categoriesData.length).fill(false), // For departments
        new Array(ratingsData.length).fill(false), // For priorities
        new Array(employeesData.length).fill(false), // For employees
      ]);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data");
      console.error("Error retrieving data:", error);
    } finally {
      setIsLoading(false);
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
        i === categoryIndex
          ? arr.map((val, j) => (j === itemIndex ? !val : val))
          : arr
      );
      return updated;
    });
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

  // Render loading or error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                key={category.id || idx} // Use id if available, otherwise index
                checked={checkedStates[0][idx]}
                onClick={() => updateCheckbox(0, idx)}
                label={category.name}
              />
            ))
          ) : expandedIndex === 1 && ratings.length > 0 ? (
            ratings.map((rating, idx) => (
              <UserCheckbox
                key={rating.id || idx}
                checked={checkedStates[1][idx]}
                onClick={() => updateCheckbox(1, idx)}
                label={rating.name}
              />
            ))
          ) : expandedIndex === 2 && employees.length > 0 ? (
            employees.map((employee, idx) => (
              <UserCheckbox
                key={employee.id || idx}
                checked={checkedStates[2][idx]}
                onClick={() => updateCheckbox(2, idx)}
                label={employee.name} // Adjust based on actual employee data structure
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
