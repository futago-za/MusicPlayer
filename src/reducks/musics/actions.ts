import { Action } from 'redux';

export const FETCH_RECENTLY_ADDED_SONGS_PAYLOAD = 'FETCH_RECENTLY_ADDED_SONGS_PAYLOAD';

export type FetchNewAddedSongsPayload = number[];

interface FetchNewAddedSongsAction extends Action {
  type: 'FETCH_RECENTLY_ADDED_SONGS_PAYLOAD';
  payload: FetchNewAddedSongsPayload;
}

export const fetchRecentrlyAddedSongsAction = (newAddedSongs: FetchNewAddedSongsPayload) => {
  return {
    type: 'FETCH_RECENTLY_ADDED_SONGS_PAYLOAD',
    payload: newAddedSongs,
  };
};

export type fetchAction = FetchNewAddedSongsAction;
