import React from "react";
import styles from "./NameFilter.module.css";
import Image from "next/image";

type Props = {
  name: string;
};

const NameFilter = (props: Props) => {
  return (
    <button className={styles.button}>
      <p>{props.name}</p>
      <Image src={"x.svg"} width={14} height={14} alt="x" />
    </button>
  );
};

export default NameFilter;
