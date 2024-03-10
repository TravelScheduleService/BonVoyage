import { useState } from "react";
import styles from "./nicknameInput.module.scss";

export default function NicknameInput() {
  const [nickName, setNickName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newNickname = e.target.value;
    setNickName(newNickname);
  };

  const handleBlur = (): void => {
    if (nickName.length > 10) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>닉네임</label>
      <input
        className={`${styles["inputBox"]} ${isValid ? "" : styles["invalid"]}`}
        placeholder="닉네임을 입력해 주세요"
        type="text"
        value={nickName}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>

      {!isValid && (
        <span className={styles["errorMsg"]}>10자 이하로 작성해 주세요.</span>
      )}
    </div>
  );
}
