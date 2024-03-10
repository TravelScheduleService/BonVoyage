import { useState } from "react";
import styles from "./passwordConfirmInput.module.scss";
import Image from "next/image";
import eyeOffIcon from "../../../../../public/assets/icon/eyeOffIcon.svg";
import eyeOnIcon from "../../../../../public/assets/icon/eyeOnIcon.svg";

interface Props {
  password: string;
}

export default function PasswordConfirmInput({ password }: Props) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSame, setIsSame] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
  };

  const handleBlur = (): void => {
    if (confirmPassword === password) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  };

  const handleClick = (): void => {
    setIsClicked(!isClicked);
  };
  return (
    <div className={styles["inputForm"]}>
      <label className={styles["inputLabel"]}>비밀번호 확인</label>
      <input
        className={`${styles["inputBox"]} ${isSame ? "" : styles["invalid"]}`}
        placeholder="비밀번호를 한번 더 입력해 주세요"
        type={isClicked ? "text" : "password"}
        value={confirmPassword}
        onChange={handleInputChange}
        onBlur={handleBlur}
      ></input>
      <Image
        className={styles["eyeIcon"]}
        onClick={handleClick}
        src={isClicked ? eyeOnIcon : eyeOffIcon}
        alt="EyeIcon"
      ></Image>
      {!isSame && (
        <span className={styles["errorMsg"]}>
          비밀번호가 일치하지 않습니다.
        </span>
      )}
    </div>
  );
}
