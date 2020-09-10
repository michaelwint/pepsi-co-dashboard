import React, {createContext, useReducer} from 'react';

const initialState = {
    isLoading: true
}

const flowratesPageStore = createContext(initialState);
const { Provider } = flowratesPageStore;

const FlowratesPageStateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { flowratesPageStore, FlowratesPageStateProvider }