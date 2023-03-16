import { Action } from 'redux';
import { Player } from './reducers';

export const FETCH_VOLUME = 'FETCH_VOLUME';

export type FetchVolumePayload = {
  volume: number;
};

interface FetchVolumeAction extends Action {
  type: 'FETCH_VOLUME';
  payload: FetchVolumePayload;
}

export const fetchVolumeAction = (player: Player) => {
  return {
    type: 'FETCH_VOLUME',
    payload: player,
  };
};

export const FETCH_SEEK = 'FETCH_SEEK';

export type FetchSeekPayload = {
  seek: number;
};

interface FetchSeekAction extends Action {
  type: 'FETCH_SEEK';
  payload: FetchVolumePayload;
}

export const fetchSeekAction = (player: Player) => {
  return {
    type: 'FETCH_SEEK',
    payload: player,
  };
};

export const FETCH_DURATION = 'FETCH_DURATION';

export type FetchDurationPayload = {
  duration: number;
};

interface FetchDurationAction extends Action {
  type: 'FETCH_DURATION';
  payload: FetchDurationPayload;
}

export const fetchDurationAction = (player: Player) => {
  return {
    type: 'FETCH_DURATION',
    payload: player,
  };
};

export const FETCH_PLAYING_MUSIC_INFO = 'FETCH_PLAYING_MUSIC_INFO';

export type FetchPlayingMusicInfoPayload = {
  id: number;
};

interface FetchPlayingMusicInfoAction extends Action {
  type: 'FETCH_PLAYING_MUSIC_INFO';
  payload: FetchPlayingMusicInfoPayload;
}

export const fetchPlayingMusicInfoAction = (player: Player) => {
  return {
    type: 'FETCH_PLAYING_MUSIC_INFO',
    payload: player,
  };
};

export type fetchAction = FetchVolumeAction | FetchSeekAction | FetchDurationAction | FetchPlayingMusicInfoAction;
