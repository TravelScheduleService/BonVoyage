import { useState } from 'react';
import styles from './colorPalette.module.scss';
import classNames from 'classnames/bind';
import CheckIcon from '@/components/icon/CheckIcon';

const cn = classNames.bind(styles);

interface Props {
  colorList: { [value: string]: string };
  colorNameList: string[];
  onClickPaletteColor: (color: string) => void;
}

export default function ColorPalette({
  colorList,
  colorNameList,
  onClickPaletteColor,
}: Props) {
  const [color, setColor] = useState(colorNameList[0]);

  const onClickColor = (color: string) => {
    setColor(color);
    onClickPaletteColor(color);
  };

  return (
    <div className={cn('palette')}>
      {colorNameList.map((element, index) => {
        return (
          <div
            key={index}
            className={cn('paletteColor')}
            onClick={() => onClickColor(element)}
            style={{ backgroundColor: `${colorList[element]}` }}
          >
            {element === color && (
              <div className={cn('checkIcon')}>
                <CheckIcon color="white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
