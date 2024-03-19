import { CreateDoItYourselfProps } from '@/@types/type';
import classNames from 'classnames/bind';
import { PropsWithChildren, forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';
import styles from './createDoItYourselfInput.module.scss';

const cn = classNames.bind(styles);

const CreateDoItYourselfInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CreateDoItYourselfProps>
>(function (
  {
    title,
    value,
    onChange,
    content,
    icon,
    children,
    className,
    required = false,
    isSpecialInput = false,
    isVertical = false,
    type = 'text',
    onKeyDown,
    ...props
  },
  ref,
) {
  // require: true 일 경우, 필수 입력 필드로 설정
  const inputProps = required ? { ...props, required: true } : props;

  return (
    <div className={cn('formContainer', className)}>
      {/* content를 placeholder로 사용하고, required prop 적용 */}
      <label className={styles.labelContainer}>
        {title}
        {required && <span className={styles.requiredLabel}>*</span>}
      </label>
      {!isSpecialInput ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={content}
          ref={ref}
          {...inputProps}
          className={styles.inputContainer}
          data-has-icon={icon ? true : undefined}
          onKeyDown={onKeyDown}
        />
      ) : (
        <div
          className={cn('specialInputWrapper', { 'flex-column': isVertical })}
        >
          {icon && <div className={styles.calendarIcon}>{icon}</div>}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={content}
            ref={ref}
            {...inputProps}
            className={styles.specialInputContainer}
            data-has-icon={icon ? true : undefined}
            onKeyDown={onKeyDown}
          />
          {children}
        </div>
      )}
    </div>
  );
});

CreateDoItYourselfInput.displayName = 'CreateDoItYourselfInput';

export default CreateDoItYourselfInput;
