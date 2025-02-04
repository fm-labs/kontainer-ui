import { RESET, SET_ERROR, SET_LOADING } from './ActionTypes'
import { IStore, IStoreAction } from './store.types.ts'
import { initialState } from './initialStore.tsx'

const AppReducer = (state: IStore, action: IStoreAction): IStore => {
  //console.log("REDUCER", action, state)

  switch (action.type) {
    case RESET:
      return initialState

    case SET_LOADING:
      return {
        ...state,
        loading: !!action.payload,
      }

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      //throw new Error();
      console.log('UNKNOWN ACTION', action)
      return state
  }
}

export default AppReducer
