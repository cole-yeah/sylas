import { createContext } from 'react';
import history from 'history';

export const routerCtx = createContext({
  history,
});
