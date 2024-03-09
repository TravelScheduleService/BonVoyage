import { useState } from "react";
import styles from "./emailInput.module.scss";

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function EmailInput() {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleBlur = (): void => {
    setIsValid(validateEmail(email));
  };

  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>이메일</label>
      <input
        className={`${styles["inputBox"]} ${isValid ? "" : styles["invalid"]}`}
        placeholder="이메일을 입력해 주세요"
        type="email"
        value={email}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>
      {!isValid && (
        <span className={styles["errorMsg"]}>
          이메일 형식으로 작성해 주세요.
        </span>
      )}
    </div>
  );
}
