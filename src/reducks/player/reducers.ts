import * as Actions from './actions';
import initialState from '../store/initialState';

export type Player = {
  volume: number;
  seek: number;
  id: number;
};

export const PlayerReducer = (state = initialState.player, action: Actions.fetchAction): Player => {
  switch (action.type) {
    case Actions.FETCH_VOLUME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_SEEK:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_DURATION:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_PLAYING_MUSIC_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
