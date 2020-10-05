/* import {authAPI} from "../api/api";
/* import {stopSubmit} from "redux-form"; */
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false
};

export type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
