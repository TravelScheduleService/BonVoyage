import classNames from 'classnames/bind';
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import styles from './commonInput.module.scss';

const cn = classNames.bind(styles);

export interface CommonInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

interface Props extends PropsWithChildren<CommonInputProps> {
  label: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  icon?: ReactNode;
}

function CommonInput({
  children,
  errors,
  label,
  name,
  register,
  registerOptions,
  icon,
  ...props
}: Props) {
  const error = errors[name as string];
  const invalid = error !== undefined;

  return (
    <div className={styles.inputForm}>
      <label className={styles.inputLabel}>{label}</label>
      {icon && <div className={styles.passwordIcon}>{icon}</div>}
      <input
        className={cn('inputBox', { invalid })}
        {...register(name, registerOptions)}
        {...props}
      />
      {children}
      {invalid && (
        <span className={styles.errorMsg}>{error?.message as string}</span>
      )}
    </div>
  );
}

export default CommonInput;
