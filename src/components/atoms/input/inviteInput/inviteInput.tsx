import { ChangeEventHandler } from 'react';
import CreateDoItYourselfInput from '../createDoItYourselfCommonInput/CreateDoItYourselfInput';

export default function InviteInput({
  value,
  onChange,
}: {
  value?: string;
  onChange?: ChangeEventHandler;
}) {
  return (
    <CreateDoItYourselfInput
      title="이메일"
      content="초대할 사람의 이메일"
      value={value}
      onChange={onChange}
      required
    />
  );
}
