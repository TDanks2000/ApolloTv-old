import {SERVICES} from '../../@types';
import {storage} from './cleint';

export const getToken = async (service: SERVICES) => {
  const token = storage.getString(`token-${service}`);
  return token;
};

export const setToken = async (service: SERVICES, token: string) => {
  const tokenKey = `token-${service}`;
  storage.set(tokenKey, token);

  console.log(`set token for ${service}`);

  return token;
};
