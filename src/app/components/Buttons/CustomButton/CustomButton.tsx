import styles from "./CustomButton.module.css";

export default function CustomButton() {
  const buttons = [
    { text: "დიზაინი", style: styles.pink },
    { text: "მარკეტინგი", style: styles.orange },
    { text: "ლოგისტიკა", style: styles.blue },
    { text: "ინფ. ტექ.", style: styles.yellow },
  ];

  return (
    <div className={styles.container}>
      {buttons.map((btn, index) => (
        <button key={index} className={`${styles.button} ${btn.style}`}>
          {btn.text}
        </button>
      ))}
    </div>
  );
}
