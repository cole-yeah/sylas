
export const createStore = (reducer, preloadedState, enhancer) => {
  let curState = preloadedState;
  let listener = [];
  let isDisptching = false;
  const getState = () => curState
  const subscribe = () => {
    if(isDisptching) return;
    // listener.
  }
  const unsubscribe = () => {}
  return {
    dispatch: () => {},
    subscribe: () => {},
    getState
  }
}

export const combineReducers = () => {}

/**
 * 
 * @param  {Function Array} middlewares 其他中间件函数，如logger
 */
export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    const middlewareAPI = {
      state: store.getState(),
      // dispatch: st
    }
    middlewares.map(middleware => middlewares({  }))
  }
}

export const bindActionCreators = () => {

}

/**
 * 
 * @param {Function Array} funcs 
 * compose(funcA, funcB, funcC) --> funcA(funcB(funcC()))
 */
export const compose = (...funcs) => {
  /**
   * (...args) => a(b(...args)) 这一步是将这个函数
   */
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
