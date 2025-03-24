// import styles from "./PriorityButtons.module.css";
// import HighIcon from "../../../../../public/high.svg";
// import MediumIcon from "../../../../../public/Medium.svg";
// import LowIcon from "../../../../../public/Low.svg";
// import Image from "next/image";

// export default function PriorityButton() {
//   const buttons = [
//     { text: "მაღალი", style: styles.red, icon: HighIcon },
//     { text: "საშუალო", style: styles.yellow, icon: MediumIcon },
//     { text: "დაბალი", style: styles.green, icon: LowIcon },
//   ];

//   return (
//     <div className={styles.container}>
//       {buttons.map((btn, index) => (
//         <button key={index} className={`${styles.button} ${btn.style}`}>
//           <Image src={btn.icon} alt={btn.text} width={16} height={16} />
//           {btn.text}
//         </button>
//       ))}
//     </div>
//   );
// }

import React from "react";
import styles from "./PriorityButtons.module.css";
import clsx from "clsx";
import HighIcon from "../../../../../public/high.svg";
import MediumIcon from "../../../../../public/Medium.svg";
import LowIcon from "../../../../../public/Low.svg";
import Image from "next/image";

type Priority = "high" | "medium" | "low";
type Size = "big" | "small";

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { icon: HighIcon, label: "მაღალი", color: "red" };
    case "medium":
      return { icon: MediumIcon, label: "საშუალო", color: "yellow" };
    case "low":
      return { icon: LowIcon, label: "დაბალი", color: "green" };
    default:
      return { icon: MediumIcon, label: "Medium", color: "none" };
  }
};

type Props = {
  priority: Priority;
  size: Size;
};

const PriorityButton = ({ priority, size }: Props) => {
  const { icon, label, color } = getPriorityIcon(priority);
  return (
    <div className="styles.button-container">
      <div className={clsx(styles.container, styles[size], styles[color])}>
        <Image src={icon} alt={label} />
        <p>{label}</p>
      </div>
    </div>
  );
};

export default PriorityButton;
