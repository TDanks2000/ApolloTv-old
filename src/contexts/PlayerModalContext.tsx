import {createContext, useEffect, useState} from 'react';
import {EpisodeInfo} from '../@types';

export const NavigationContext = createContext({});

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
