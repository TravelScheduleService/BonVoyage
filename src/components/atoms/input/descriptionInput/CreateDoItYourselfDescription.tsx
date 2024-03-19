import { CreateDoItYourselfProps } from '@/@types/type';
import { forwardRef } from 'react';
import CreateDoItYourselfInput from '../createDoItYourselfCommonInput/CreateDoItYourselfInput';

const CreateDoItYourselfDescription = forwardRef<
  HTMLInputElement,
  Partial<CreateDoItYourselfProps>
>(function (props, ref) {
  return (
    <CreateDoItYourselfInput
      title="설명"
      content="설명을 입력해 주세요"
      ref={ref}
      required
      {...props}
    />
  );
});

CreateDoItYourselfDescription.displayName = 'CreateDoItYourselfDescription';

export default CreateDoItYourselfDescription;
