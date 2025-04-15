"use client";
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
  const [statusList, setStatusList] = useState<Status[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/statuses")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStatusList(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching statuses");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!statusList || statusList.length === 0)
    return <div>No statuses available</div>;

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
          statusList.find(
            (status) => status.name === "მზად ტესტირებისთვის"
          )?.name || "მზად ტესტირებისთვის"
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
