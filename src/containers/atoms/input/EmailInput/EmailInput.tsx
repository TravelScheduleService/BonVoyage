import styles from "./emailInput.module.scss";

export default function EmailInput() {
  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>이메일</label>
      <input
        className={styles["inputBox"]}
        placeholder="이메일을 입력해 주세요"
      ></input>
    </div>
  );
}
