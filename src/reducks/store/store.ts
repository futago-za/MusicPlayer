import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';

import { Player, PlayerReducer } from '../player/reducers';
import { Musics, MusicsReducer } from '../musics/reducers';
import storage from 'redux-persist/lib/storage';

export type AppState = {
  player: Player;
  musics: Musics;
};

const persitConfig = {
  key: 'root',
  storage,
};

export default function createStore() {
  const store = reduxCreateStore(
    persistReducer(
      persitConfig,
      combineReducers<AppState>({
        player: PlayerReducer,
        musics: MusicsReducer,
      })
    ),
    applyMiddleware(thunk)
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
