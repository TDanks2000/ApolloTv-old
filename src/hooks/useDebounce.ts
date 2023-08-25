import {useEffect, useState} from 'react';

const useDebounce = (debounceFn: () => void, delay: number, debounce: any) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      debounceFn();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debounce, delay]);

  return true;
};

export default useDebounce;
