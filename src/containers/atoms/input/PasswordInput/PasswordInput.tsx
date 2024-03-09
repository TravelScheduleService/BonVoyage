import { useState } from "react";
import styles from "./passwordInput.module.scss";
import Image from "next/image";
import eyeOffIcon from "../../../../../public/assets/icon/eyeOffIcon.svg";
import eyeOnIcon from "../../../../../public/assets/icon/eyeOnIcon.svg";

export default function EmailInput() {
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

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

  const handleClick = (): void => {
    setIsClicked(!isClicked);
  };
  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>비밀번호</label>
      <input
        className={`${styles["inputBox"]} ${isValid ? "" : styles["invalid"]}`}
        placeholder="비밀번호를 입력해 주세요"
        type={isClicked ? "text" : "password"}
        value={password}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>
      <Image
        className={styles["eyeIcon"]}
        onClick={handleClick}
        src={isClicked ? eyeOnIcon : eyeOffIcon}
        alt="EyeIcon"
      ></Image>
      {!isValid && (
        <span className={styles["errorMsg"]}>8자 이상 입력해 주세요.</span>
      )}
    </div>
  );
}
