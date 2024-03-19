import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { ButtonProps } from '@/@types/type';

const cn = classNames.bind(styles);

const Button = ({
  name,
  disabled,
  type,
  color,
  onClick,
  icon,
  buttonProps,
}: ButtonProps) => {
  const classNames = (
    type: ButtonProps['type'],
    color: ButtonProps['color'],
  ) => {
    switch (type) {
      case 'google':
        return styles.googleBtn;
      case 'kakao':
        return styles.kakaoBtn;
      case 'account':
        return styles.accountBtn;
      case 'small':
        return color === 'blue' ? styles.acceptBtn : styles.declineBtn;
      case 'delete':
        return styles.deleteBtn;
      case 'modal':
        return color === 'blue'
          ? styles.modalConfirmBtn
          : color === 'white'
            ? styles.modalCancelBtn
            : styles.modalSubmitBtn;
      default:
        return '';
    }
  };

  return (
    <>
      <button
        className={cn(classNames(type, color), 'button')}
        disabled={disabled}
        onClick={onClick}
        {...buttonProps}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.buttonText}>{name}</span>
      </button>
    </>
  );
};

export default Button;

//사용법 적기

// <Button name="로그인" type="account" />
//-> 로그인버튼

// <Button name="로그인" type="account" disabled={true} />
//-> 비활성화된 로그인버튼

// <Button name="수락" type="small" color="blue" />
//-> color="blue" 하면 파란색 배경 수락버튼

// <Button name="거절" type="small" color="white" />
//-> color="white" 하면 흰색 배경 거절버튼

// <Button name="삭제" type="delete" />
//-> 삭제버튼

// <Button name="확인" type="modal" color="blue" />
//-> color="blue" 하면 파란색 배경 확인버튼

// <Button name="취소" type="modal" color="white" />
//-> color="white" 하면 흰색 배경 취소버튼

// <Button name="입력" type="modal" />;
//-> 입력버튼, 입력버튼은 color props가 없어도 됨

// 새컬럼 생성 모달의 생성버튼,  컬럼 관리 모달의 변경버튼도 (type="modal") 활용하면 될 것 같아요
