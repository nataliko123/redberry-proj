import Image from "next/image"; // Correct import

import styles from "./ReplyButton.module.css";

export default function ReplyButton() {
  return (
    <button className={styles.replyButton}>
      <Image
        className={styles.replyimg}
        src="/reply.svg"
        alt="Reply"
        width={16}
        height={16}
      />
      <span>უპასუხე</span>
    </button>
  );
}
