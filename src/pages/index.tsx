import ImageInput from '@/containers/atoms/ImageInput/ImageInput';
import React from 'react';

const index = () => {
  return (
    <>
      <div>index</div>
      <div style={{ padding: '10px' }}>
        <ImageInput />
      </div>
    </>
  );
};

export default index;
// 여기는 메인 랜딩페이지 들어갈 곳
// var(--orange20, #fac171) -> 글로벌css 컬러 사용법
