import { useState } from "react";
import styles from "./InputField.module.css";
import checkIcon from "@/public/check.png";
import crossIcon from "@/public/cross.png";
import Image from "next/image";
interface InputFieldProps {
  label: string;
  minLength: number;
  maxLength: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  minLength,
  maxLength,
}) => {
  const [value, setValue] = useState("");

  const getValidationClass = () => {
    if (value.length === 0) {
      return styles.neutral;
    } else if (value.length >= minLength && value.length <= maxLength) {
      return styles.valid;
    } else {
      return styles.invalid;
    }
  };
  const inputIsInvalid =
    value.length > 0 && (value.length < minLength || value.length > maxLength);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}სახელი*</label>
      {/* <div className={styles.inputWithIcon}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${styles.input} ${inputIsInvalid ? styles.invalid : ""}`}
          
        />
        <img
          src={clientInformation.png}
          alt="info icon"
          className={styles.iconInsideInput}
        />
      </div> */}
      <div className={styles.inputWithIcon}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${styles.input} ${inputIsInvalid ? styles.invalid : ""}`}
        />
        <Image
          src="/Information.png"
          alt="info icon"
          className={styles.iconInsideInput}
          width={20}
          height={20}
        />
      </div>

      <div className={styles.validation}>
        <p className={getValidationClass()}>
          <img src={checkIcon.src} alt="status" className={styles.icon} />
          მინიმუმ {minLength} სიმბოლო
        </p>

        <p className={getValidationClass()}>
          <img src={checkIcon.src} alt="status" className={styles.icon} />
          მაქსიმუმ {maxLength} სიმბოლო
        </p>
      </div>
    </div>
  );
};

export default InputField;
