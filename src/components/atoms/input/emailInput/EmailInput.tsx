import CommonInput, { CommonInputProps } from '../common/CommonInput';

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function EmailInput(props: CommonInputProps) {
  return (
    <CommonInput
      label="이메일"
      name="email"
      placeholder="이메일을 입력해 주세요"
      type="email"
      registerOptions={{
        validate: (email: string) => {
          const isValid = validateEmail(email);
          return isValid ? true : '이메일 형식으로 작성해 주세요.';
        },
      }}
      {...props}
    />
  );
}
