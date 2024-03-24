import { ChangeEvent, useRef, useState } from 'react';
import styles from './ProfileImageInput.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { userUploadImage } from '@/api/accountApi/accountApi';
const cn = classNames.bind(styles);
interface Props {
  size: 'small' | 'big';
  onImageSelected: (imageUrl: string) => void;
  initialImageUrl?: string;
}
export default function ProfileImageInput({
  size,
  onImageSelected,
  initialImageUrl,
}: Props) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const imageInput = useRef<HTMLInputElement>(null);

  const onClickImageBox = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const onChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await userUploadImage(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImageUrl(imageUrl);
          onImageSelected(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        className={cn('imageInput')}
        ref={imageInput}
        type="file"
        accept=".svg, .png, .jpg, .jpeg"
        onChange={onChangeImage}
      />
      <button className={cn('imageBox', size)} onClick={onClickImageBox}>
        <div
          className={cn(
            { initialImageUrl: !imageUrl },
            { uploadImage: imageUrl },
          )}
        >
          <Image
            layout="fill"
            src={imageUrl || initialImageUrl || '/assets/icon/plusIcon.svg'}
            alt={imageUrl ? '불러온 이미지' : '+ 아이콘'}
            priority={true}
            objectFit="cover"
          />
        </div>
        {imageUrl && (
          <div className={cn('hoverImageBox')}>
            <div className={cn('iconImage')}>
              <Image
                layout="fill"
                src="/assets/icon/editIcon.svg"
                alt="연필 아이콘"
                priority={true}
                objectFit="cover"
              />
            </div>
          </div>
        )}
      </button>
    </>
  );
}
