import { CreateDoItYourselfProps } from '@/@types/type';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import Image from 'next/image';
import { SyntheticEvent, forwardRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChangeHandler } from 'react-hook-form';
import CreateDoItYourselfInput from '../createDoItYourselfCommonInput/CreateDoItYourselfInput';
import styles from './createDoItYourselfDate.module.scss';

const cn = classNames.bind(styles);
const CreateDoItYourselfDate = forwardRef<
  HTMLInputElement,
  Partial<CreateDoItYourselfProps>
>(function (props, ref) {
  const input = useRef<HTMLInputElement>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const calendarIcon = (
    <Image
      src="/assets/icon/calendarIcon.svg"
      width={22}
      height={22}
      alt="pick date"
    />
  );

  return (
    <>
      <CreateDoItYourselfInput
        className={cn('datePickerWrapper')}
        title="마감일"
        type="hidden"
        isSpecialInput={true}
        icon={calendarIcon}
        ref={(instance) => {
          if (instance) {
            input.current = instance;
            (ref as (instance: HTMLInputElement | null) => void)?.(instance);
          }
        }}
        {...props}
      >
        <DatePicker
          className={cn('datePickerContainer')}
          selected={selectedDate}
          onChange={(
            date: Date,
            event: SyntheticEvent<HTMLInputElement, Event>,
          ) => {
            setSelectedDate(date);
            const current = input.current as HTMLInputElement;
            current.value = format(date, 'yyyy-MM-dd HH:mm');
            console.log({ current, event, value: current.value });
            (props.onChange as ChangeHandler)?.({ target: current });
          }}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          placeholderText="날짜를 선택하세요"
          popperPlacement="bottom"
          popperModifiers={[
            {
              fn: () => ({ x: 0 }),
              name: 'offset',
            },
          ]}
          shouldCloseOnSelect // 달력에서 날짜를 선택하면 달력이 닫히도록 설정
        />
      </CreateDoItYourselfInput>
    </>
  );
});

CreateDoItYourselfDate.displayName = 'CreateDoItYourselfDate';

export default CreateDoItYourselfDate;
