import {SubOrDub} from '../../@types';
import {storage} from '../storage/cleint';

export const setSubOrDub = (value: SubOrDub): void => {
  switch (value) {
    case 'sub':
      console.log('setting sub');
      storage.set('subOrDub', 'sub');
      break;
    case 'dub':
      console.log('setting dub');
      storage.set('subOrDub', 'dub');
  }
};

export const getSubOrDub = (): SubOrDub => {
  const subOrDub = storage.getString('subOrDub') ?? 'sub';

  console.log(`got ${subOrDub}`);
  return subOrDub as SubOrDub;
};
