// import styles from "./CustomButton.module.css";

// export default function CustomButton() {
//   const buttons = [
//     { text: "დიზაინი", style: styles.pink },
//     { text: "მარკეტინგი", style: styles.orange },
//     { text: "ლოგისტიკა", style: styles.blue },
//     { text: "ინფ. ტექ.", style: styles.yellow },
//   ];

//   return (
//     <div className={styles.container}>
//       {buttons.map((btn, index) => (
//         <button key={index} className={`${styles.button} ${btn.style}`}>
//           {btn.text}
//         </button>
//       ))}
//     </div>
//   );
// }
import React from "react";
import styles from "./CustomButton.module.css";
import { clsx } from "clsx";

// Define types for props
type Props = {
  color: "pink" | "orange" | "blue" | "yellow"; // Define color options
  text: "დიზაინი" | "მარკეტინგი" | "ლოგისტიკა" | "ინფ.ტექ."; // Define text options
};

const CustomButton = ({ color, text }: Props) => {
  return <button className={clsx(styles.button, styles[color])}>{text}</button>;
};

export default CustomButton;
