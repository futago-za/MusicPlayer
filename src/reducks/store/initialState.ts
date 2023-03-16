export type State = {
  player: {
    // isLoop: boolean,
    // isMute: boolean,
    volume: number;
    seek: number;
    id: number;
  };
  musics: {
    newAddedSongs: number[];
  };
};

const initialState: State = {
  player: {
    volume: 1.0,
    seek: 0.0,
    id: 0,
  },
  musics: {
    newAddedSongs: [],
  },
};

export default initialState;
