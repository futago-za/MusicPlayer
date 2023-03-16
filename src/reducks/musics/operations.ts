import { FetchNewAddedSongsPayload, fetchRecentrlyAddedSongsAction } from './actions';
import { Dispatch } from 'redux';

export const fetchNewAddedSongs = (id: number[]) => {
  return async (dispatch: Dispatch) => {
    const musicsList: FetchNewAddedSongsPayload = [...id];
    dispatch(fetchRecentrlyAddedSongsAction(musicsList));
  };
};
