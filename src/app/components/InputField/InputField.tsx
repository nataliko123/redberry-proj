import { useState } from "react";
import styles from "./InputField.module.css";

const InputField = () => {
  const [text, setText] = useState("");
  const minLength = 2;
  const maxLength = 255;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>სახელი*</label>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className={styles.input}
        placeholder=""
      />
      <div className={styles.message}>
        <p className={text.length >= minLength ? styles.valid : styles.invalid}>
          ✔ მინიმუმ {minLength} სიმბოლო
        </p>
        <p className={text.length <= maxLength ? styles.valid : styles.invalid}>
          ✔ მაქსიმუმ {maxLength} სიმბოლო
        </p>
      </div>
    </div>
  );
};

export default InputField;
