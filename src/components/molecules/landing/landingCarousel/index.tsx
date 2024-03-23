import { TouchEventHandler, useEffect, useRef, useState } from 'react';
import styles from './LandingCarousel.module.scss';
import Image from 'next/image';
import ForwardArrowIcon from '@/../../public/assets/icon/forwardArrowIcon.svg';
import LeftArrowIcon from '@/../../public/assets/icon/leftArrowIcon.svg';

interface LandingCarouselProps {
  carouselList: any;
  //일단 any로 놔둘게요
}

let touchStartX: number;
let touchEndX: number;

const LandingCarousel = ({ carouselList }: LandingCarouselProps) => {
  const [currIndex, setCurrIndex] = useState(1);
  const [currList, setCurrList] = useState<string[]>([]);
  const [ratio, setRatio] = useState(0);

  const carouselRef = useRef<HTMLUListElement>(null);
  const carouselElement = carouselRef.current;

  const handleResize = () => {
    const pw = carouselRef.current?.getBoundingClientRect().width;
    const cw = (
      carouselRef.current?.childNodes[0] as HTMLLIElement
    )?.getBoundingClientRect().width;
    if (cw === undefined || pw === undefined) return;
    setRatio(cw / pw);
  };

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];
      setCurrList(newList);
    }

    if (carouselElement) {
      carouselElement.style.transform = `translateX(-${currIndex * ratio * 100}%)`;
    }
    const interval = setInterval(() => handleSwipe(1), 3000);
    return () => clearInterval(interval);
  }, [carouselList, currIndex, carouselElement]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setTimeout(() => {
      handleResize();
    }, 100);
  }, []);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (carouselElement) {
        carouselElement.style.transition = '';
      }
    }, 300);
  };

  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;

    if (newIndex === carouselList.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(carouselList.length);
    }

    setCurrIndex((prev) => prev + direction);
    if (carouselElement) {
      carouselElement.style.transition = 'all 0.5s ease-in-out';
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;

    if (carouselElement) {
      carouselElement.style.transform = `translateX(calc(-${currIndex}00% - ${
        (touchStartX - currTouchX) * 2 || 0
      }px))`;
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      handleSwipe(1);
    } else {
      handleSwipe(-1);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.carouselWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className={styles.leftBtn}
          onClick={() => handleSwipe(-1)}
        >
          <Image src={LeftArrowIcon} width={40} height={80} />
        </button>
        <button
          type="button"
          className={styles.rightBtn}
          onClick={() => handleSwipe(1)}
        >
          <Image src={ForwardArrowIcon} width={40} height={80} />
        </button>
        <ul className={styles.carousel} ref={carouselRef}>
          {currList.map((image, idx) => {
            const key = `${image}-${idx}`;
            return (
              <li key={key} className={styles.carouselItem}>
                <Image
                  src={image}
                  alt="carousel-img"
                  className={styles.carouseImg}
                  width={1200}
                  height={700}
                  priority={true}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LandingCarousel;
