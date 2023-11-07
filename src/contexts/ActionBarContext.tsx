import {Dispatch, SetStateAction, createContext, useState} from 'react';
import ActionBar from '../components/ActionBar';

type Props = {
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;

  title?: string;
  setTitle?: Dispatch<SetStateAction<string | undefined>>;

  backgroundColor?: string;
  setBackgroundColor?: Dispatch<SetStateAction<string | undefined>>;
};

export const ActionBarContext = createContext<Props>({});

export const ActionBarProvider = ({children}: any) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState<string>();
  const [backgroundColor, setBackgroundColor] = useState<string>();

  return (
    <ActionBarContext.Provider
      value={{
        show,
        setShow,
        title,
        setTitle,
        backgroundColor,
        setBackgroundColor,
      }}>
      <ActionBar />
      {children}
    </ActionBarContext.Provider>
  );
};
