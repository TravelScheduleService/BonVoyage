import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './customDatePicker.module.scss';

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className={styles.datePicker}>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={30}
        timeCaption='time'
        dateFormat='yyyy-MM-dd HH:mm'
        shouldCloseOnSelect // 달력에서 날짜를 선택하면 달력이 닫히도록 설정
      />
    </div>
  );
}
