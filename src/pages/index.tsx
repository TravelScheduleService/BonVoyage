import EmailInput from "@/containers/atoms/input/EmailInput/EmailInput";
import NicknameInput from "@/containers/atoms/input/NicknameInput/NicknameInput";
import PasswordConfirmInput from "@/containers/atoms/input/PasswordConfirmInput/passwordConfirmInput";
import PasswordInput from "@/containers/atoms/input/PasswordInput/PasswordInput";

import React from "react";

// const index = () => {
//   return <div>index</div>;
// };
const index = () => {
  return (
    <div>
      index
      <EmailInput></EmailInput>
      <PasswordInput></PasswordInput>
      <PasswordConfirmInput></PasswordConfirmInput>
      <NicknameInput></NicknameInput>
    </div>
  );
};

export default index;
// 여기는 메인 랜딩페이지 들어갈 곳
// var(--orange20, #fac171) -> 글로벌css 컬러 사용법
