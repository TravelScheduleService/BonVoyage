import { useState } from "react";
import styles from "./passwordInput.module.scss";

export default function EmailInput() {
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleBlur = (): void => {
    if (password.length < 8) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>비밀번호</label>
      <input
        className={`${styles["inputBox"]} ${isValid ? "" : styles["invalid"]}`}
        placeholder="비밀번호를 입력해 주세요"
        type="password"
        value={password}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>
      {!isValid && (
        <span className={styles["errorMsg"]}>8자 이상 입력해 주세요.</span>
      )}
    </div>
  );
}
