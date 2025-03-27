import React from "react";
import styles from "./UserCheckbox.module.css";
import Checkbox from "../../Icon/UserCheckbox";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  label: string;
};

const UserCheckbox = ({ imageSrc, label }: Props) => {
  return (
    <div className={styles.button}>
      <Checkbox />
      {imageSrc && <Image src={imageSrc} width={28} height={28} alt="icon" color="#8338EC"/>}
      <p>{label}</p>
    </div>
  );
};

export default UserCheckbox;
