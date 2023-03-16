import * as Actions from './actions';
import initialState from '../store/initialState';

export type Musics = {
  newAddedSongs: number[];
};

export const MusicsReducer = (state = initialState.musics, action: Actions.fetchAction): Musics => {
  switch (action.type) {
    case Actions.FETCH_RECENTLY_ADDED_SONGS_PAYLOAD:
      return {
        ...state,
        newAddedSongs: [...action.payload],
      };
    default:
      return state;
  }
};
