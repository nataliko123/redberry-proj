import React, { useState } from "react";
import styles from "./UserCheckbox.module.css";
import Image from "next/image";
import SvgComponent from "../../Icon/checkBox";

interface UserCheckboxProps {
  imageUrl: string;
  label: string;
}

const UserCheckbox: React.FC<UserCheckboxProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={styles.checkboxContainer}
      onClick={() => setChecked(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className={styles.hiddenCheckbox}
      />
      <div className={styles.customCheckbox}>{checked && <SvgComponent />}</div>
      <Image
        src="/avatar.png"
        alt="User"
        className={styles.avatar}
        width={50}
        height={50}
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default UserCheckbox;
