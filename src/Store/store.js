import React, {createContext, useReducer} from 'react';
import { LOADING_STARTED, LOADING_FINISHED, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES, SET_REFRESH_RATE, LOAD_HARD_SOFT_FLOWRATES } from './ActionTypes/actionTypes'

const initialState = {
    serverUrl: "http://industrial-modeler-poc-1998904937.eu-west-1.elb.amazonaws.com:9010/api/",
    HomePage: {
      isLoading: true,
      currentProductionFlowrates: {},
      valveGroupCurrentFlowrates: {},
      hardWaterData: {},
      softWaterData: {},
      refreshRate: 5000
    }
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case LOAD_CURRENT_PROD_SEGMENT_FLOWRATES:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            currentProductionFlowrates: action.payload
          }
        }
      case LOAD_VALVE_GROUP_CURRENT_FLOWRATES:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            valveGroupCurrentFlowrates: action.payload
          }
        }
      case LOADING_STARTED:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            isLoading: true
          }
        };
      case LOADING_FINISHED:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            isLoading: false
          }
        };
      case SET_REFRESH_RATE:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            refreshRate: action.payload
          }
        }

      case LOAD_HARD_SOFT_FLOWRATES:
        return {
          ...state,
          HomePage: {
            ...state.HomePage,
            hardWaterData: action.payload.hardWaterData,
            softWaterData: action.payload.softWaterData
          }
        }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }