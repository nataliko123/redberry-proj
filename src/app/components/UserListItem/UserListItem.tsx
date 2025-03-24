import React from "react";
import styles from "./UserListItem.module.css";
import Image from "next/image";

interface UserListItemProps {
  imageUrl: string;
  name: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ name }) => {
  return (
    <div className={styles.listItem}>
      <Image
        src="/avatar.png"
        alt="Description"
        className="your-class-name"
        width={28}
        height={28}
        loading="lazy" // Lazy loading for better performance
      />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default UserListItem;
