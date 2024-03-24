import ChipTag from '@/components/atoms/chipTag/ChipTag';
import CreateDoItYourselfInput from '@/components/atoms/input/createDoItYourselfCommonInput/CreateDoItYourselfInput';
import { Dispatch, useCallback, useState } from 'react';
import styles from './createDoItYourselfTag.module.scss';

interface Props {
  defaultTags?: string[];
  onChangeTags: Dispatch<string[]>;
}

const colors: Array<'orange' | 'pink' | 'blue' | 'green'> = [
  'orange',
  'green',
  'pink',
  'blue',
];

export default function CreateDoItYourselfTag({
  defaultTags = [],
  onChangeTags,
}: Props) {
  const [tags, setTagsState] = useState<string[]>(defaultTags); // 입력된 태그들을 저장하는 상태
  const [hasTags, setHasTags] = useState<boolean>(defaultTags.length > 0); // 입력된 태그 여부를 저장하는 상태

  const setTags = useCallback(
    function (action: (prevState: string[]) => string[]) {
      const newTags = action(tags);
      setTagsState(newTags);
      onChangeTags(newTags);
    },
    [onChangeTags, tags],
  );

  // 엔터를 누르면 태그를 추가하는 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim().slice(0, 10); // 입력된 값을 최대 10글자로 제한

      // 태그가 중복되지 않는지 확인
      if (!tags.includes(newTag) && tags.length < 7) {
        // 태그 개수가 7개보다 작을 때만 추가
        setTags((prevTags) => [...prevTags, newTag]); // 새로운 태그를 추가함
        setHasTags(true); // 태그가 추가되었으므로 hasTags 상태를 true로 변경
      }

      event.currentTarget.value = ''; // 입력 필드를 비움
    }
  };

  // 태그를 클릭하여 해당 태그를 제거하는 함수
  const handleTagClick = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    setHasTags(tags.length > 1); // 태그가 1개 이상 남아있으면 hasTags 상태를 true로 유지
  };

  return (
    <CreateDoItYourselfInput
      title="태그"
      content="입력 후 Enter를 누르세요"
      type="text"
      maxLength={10}
      onKeyDown={handleKeyDown}
      isSpecialInput
      isVertical
    >
      {hasTags && (
        <>
          <hr className={styles.underline} />
          <div
            className={`${styles.tagContainer} ${hasTags ? styles.hasTags : ''}`}
          >
            <div className={styles.tag}>
              {tags.map((tag, index) => (
                <ChipTag
                  key={index}
                  tag={tag}
                  color={colors[index % 4]}
                  onClick={() => handleTagClick(index)} // 태그 클릭 시 삭제되는 핸들러 추가
                />
              ))}
            </div>
          </div>
        </>
      )}
    </CreateDoItYourselfInput>
  );
}
