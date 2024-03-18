import { useState, useCallback } from 'react';

const useSessionStorage = <T>(
  key: string,
  initialValue?: T,
  raw = false,
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);
      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue),
        );
        return initialValue;
      } else {
        return raw
          ? sessionStorageValue
          : JSON.parse(sessionStorageValue || 'null');
      }
    } catch {
      return initialValue;
    }
  });

  const setSession = useCallback(
    (state: T) => {
      try {
        const serializedState = raw ? String(state) : JSON.stringify(state);
        sessionStorage.setItem(key, serializedState);
        setState(state);
      } catch (e) {
        console.error(e);
      }
    },
    [key, raw],
  );

  return [state, setSession];
};

export default useSessionStorage;
