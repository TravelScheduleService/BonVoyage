import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreateDoItYourselfInput from '../createDoItYourselfCommonInput/CreateDoItYourselfInput';
import styles from './createDoItYourselfDate.module.scss';

const cn = classNames.bind(styles);

export default function CreateDoItYourselfDate() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      >
        <DatePicker
          className={cn('datePickerContainer')}
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
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
}
