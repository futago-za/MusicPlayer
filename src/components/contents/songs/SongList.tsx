import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SongListItem, { SongInfo } from './SongListItem';

const Cell = styled(Typography)({
  boxSizing: 'border-box',
  fontSize: '12px',
  color: '#FFFFFF',
  lineHeight: 1,
  padding: '10px 0'
});

function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.floor(value - minute * 60);
  return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
}

const SongList = () => {
  const [songs, setSongs] = useState<SongInfo[]>([]);

  useEffect(() => {
    (async() => {
      const newSongs: SongInfop[] = [];
      const gettedSongs = await window.sqlite.findSongs(null, null);
      gettedSongs.map((song) => {
        newSongs.push({
          id: song.id,
          cover: song.album.cover,
          title: song.title,
          album: song.album.title,
          artist: song.artist.name,
          genre: song.genre,
          duratioin: song.duration
        });
      })
      setSongs(newSongs);
    })();
  }, []);

  return (
    <main className="contents">
      <Box sx={{width: "100%", height: '100%', padding: "0 18px"}}>
        <Box sx={{marginBottom: '6px'}}>
          <Box sx={{display: 'flex', width: '100%'}}>
            <Cell sx={{width: '45%', paddingLeft: '40px'}}>タイトル</Cell>
            <Cell sx={{width: '30%'}}>アルバム</Cell>
            <Cell sx={{width: '15%'}}>ジャンル</Cell>
            <Cell sx={{width: '10%'}}>時間</Cell>
          </Box>
          <Divider sx={{borderColor: '#B8B8B8'}}/>
        </Box>
        <List sx={{overflow: 'auto', maxHeight: 'calc(100% - 39px)', padding: 0}}>
          { songs &&
            songs.map((song, index) => {
              return <SongListItem key={index} songInfo={song}/>
            })
          }
        </List>
      </Box>
    </main>
  );
};

export default SongList;
