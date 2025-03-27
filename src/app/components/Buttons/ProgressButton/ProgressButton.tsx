import styles from "./ProgressButton.module.css";

interface ProgressButtonProps {
  text: string;
  color: "yellow" | "orange" | "pink" | "blue";
}

const ProgressButton: React.FC<ProgressButtonProps> = ({ text, color }) => {
  return <button className={`${styles.progressButton} ${styles[color]}`}>{text}</button>;
};

export default ProgressButton;
