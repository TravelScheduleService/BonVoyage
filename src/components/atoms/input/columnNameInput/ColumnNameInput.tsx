import { ChangeEventHandler } from 'react';
import CreateDoItYourselfInput from '../createDoItYourselfCommonInput/CreateDoItYourselfInput';

export default function ColumnNameInput({
  value,
  onChange,
}: {
  value?: string;
  onChange?: ChangeEventHandler;
}) {
  return (
    <CreateDoItYourselfInput
      title="이름"
      content="새로운 프로젝트"
      value={value}
      onChange={onChange}
      required
    />
  );
}
