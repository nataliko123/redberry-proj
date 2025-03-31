import clsx from "clsx";
import React, { useState, useEffect } from "react";
import styles from "./ProgressButton.module.css";

type Color = "yellow" | "orange" | "pink" | "blue";

type Status = {
  id: number;
  name: string;
};

type Props = {
  color: Color;
};

const ProgressButton: React.FC<Props> = ({ color }) => {
  const [statusList, setStatusList] = useState<Status[] | null>(null); // state for the status list
  const [loading, setLoading] = useState<boolean>(true); // state for loading
  const [error, setError] = useState<string | null>(null); // state for error handling

  // Fetch statuses from the API
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/statuses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }
        const data = await response.json();
        setStatusList(data); // Set the fetched statuses to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Error fetching statuses"); // Set error message if fetching fails
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchStatuses();
  }, []);

  // Handle when the data is still loading or error occurred
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle when statusList is empty or undefined
  if (!statusList || statusList.length === 0) {
    return <div>No statuses available</div>;
  }

  // Map colors to the correct status name
  const getColorText = (color: Color) => {
    switch (color) {
      case "yellow":
        return (
          statusList.find((status) => status.name === "დასაწყები")?.name ||
          "დასაწყები"
        );
      case "orange":
        return (
          statusList.find((status) => status.name === "პროგრესში")?.name ||
          "პროგრესში"
        );
      case "pink":
        return (
          statusList.find((status) => status.name === "მზად ტესტირებისთვის")
            ?.name || "მზად ტესტირებისთვის"
        );
      case "blue":
        return (
          statusList.find((status) => status.name === "დასრულებული")?.name ||
          "დასრულებული"
        );
      default:
        return "დასაწყები";
    }
  };

  const text = getColorText(color);

  return (
    <div className={clsx(styles.progressButton, styles[color])}>{text}</div>
  );
};

export default ProgressButton;
