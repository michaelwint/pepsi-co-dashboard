import React, {createContext, useReducer} from 'react';
import { LOADING_STARTED, LOADING_FINISHED, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES, SET_REFRESH_RATE, LOAD_HARD_SOFT_FLOWRATES } from './ActionTypes/actionTypes'

const initialState = {
    isLoading: true,
    currentProductionFlowrates: {},
    valveGroupCurrentFlowrates: {},
    hardWaterData: {},
    softWaterData: {},
    refreshRate: 50000
  }

const homePageStore = createContext(initialState);
const { Provider } = homePageStore;

const HomePageStateProvider = ( { children } ) => {
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

export { homePageStore, HomePageStateProvider }