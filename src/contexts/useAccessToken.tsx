import React, {useState, createContext, useContext, useEffect} from 'react';
import {ANILIST_ACCESS_TOKEN_STORAGE} from '../utils/constants';
import {storage} from '../utils';

import {IUseAcessToken} from '../@types';

const AccessTokenContext = createContext<IUseAcessToken | null>(null);

export function useAccessToken() {
  const context = useContext(AccessTokenContext);

  // if (context === null) {
  //   throw new Error('useAccessToken must be used within a AccessTokenProvider');
  // }

  return context;
}

export function AccessTokenProvider({children}: {children: React.ReactNode}) {
  const [accessToken, setAccessToken] = useState<string>();
  const [checkedForToken, setCheckedForToken] = useState<boolean>(false);

  useEffect(function fetchToken() {
    (async () => {
      try {
        const token = await storage.getString(ANILIST_ACCESS_TOKEN_STORAGE);
        if (token) {
          setAccessToken(token);
        }
      } finally {
        setCheckedForToken(true);
      }
    })();
  });

  return (
    <AccessTokenContext.Provider
      value={{accessToken, setAccessToken, checkedForToken}}>
      {children}
    </AccessTokenContext.Provider>
  );
}
