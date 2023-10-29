import {createContext, useEffect, useState} from 'react';
import {EpisodeInfo} from '../@types';

type Props = {
  showNavBar?: boolean;
  setShowNavBar?: (value: boolean) => void;
};

export const NavigationContext = createContext<Props>({});

export const NavigationProvixer = ({children}: any) => {
  const [showNavBar, setShowNavBar] = useState(true);

  return (
    <NavigationContext.Provider
      value={{
        showNavBar,
        setShowNavBar,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};
