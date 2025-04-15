import React from "react";
import styles from "./UserCheckbox.module.css";
import Checkbox from "../../Icon/UserCheckbox"; // Assuming this is your custom checkbox component
import Image from "next/image";

type NewType = {
  checked: boolean;
  onClick: () => void;
  imageSrc?: string;
  label: string;
};

type Props = NewType;

const UserCheckbox = ({ checked, onClick, imageSrc, label }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <Checkbox /> {/* Assuming this is your checkbox icon */}
      {imageSrc && (
        <Image src={imageSrc} width={28} height={28} alt="icon" />
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={onClick} // Trigger the onClick to toggle the checkbox
        style={{ display: "none" }} // Hide the default checkbox if needed
      />
      <p>{label}</p>
    </div>
  );
};

export default UserCheckbox;
