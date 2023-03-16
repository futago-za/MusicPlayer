import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ArtistAlbumListItem, { AlbumInfoForArtist } from './ArtistAlbumListItem';

const ArtistAlbumList = (props: { selectedIndex: number }) => {
  const [artist, setArtist] = useState('');
  const [albums, setAlbums] = useState<AlbumInfoForArtist[]>([]);
  const [songsNum, setSongsNum] = useState(0);
  useEffect(() => {
    (async () => {
      let songSum = 0;
      const newArtist = await window.sqlite.findArtist(props.selectedIndex);
      const newAlbums: AlbumInfoForArtist[] = [];
      let albumsFromSQLite = [];
      if (!newArtist) {
        setArtist('すべてのアーティスト');
        albumsFromSQLite = await window.sqlite.findAlbums();
      } else {
        setArtist(newArtist.name);
        albumsFromSQLite = await window.sqlite.findAlbumsFromSongs(newArtist.name);
      }
      for (const album of albumsFromSQLite) {
        const songs = await window.sqlite.findSongs(album.title, newArtist ? newArtist.name : null);
        songs.map((song) => {
          delete song.create_at;
          delete song.update_at;
          song.artist = song.artist.name;
          return song;
        });
        delete album.create_at;
        delete album.update_at;
        songSum += songs.length;
        newAlbums.push({ ...album, songs: [...songs] });
      }
      setAlbums(newAlbums);
      setSongsNum(songSum);
    })();
  }, [props.selectedIndex]);

  return (
    <Box sx={{ width: 'calc(100% - 203px)', zIndex: 0 }}>
      <Box sx={{ width: '100%', height: '90px', padding: '15px 20px 0', backgroundColor: '#454545' }}>
        <Typography
          component="h1"
          noWrap={true}
          sx={{ color: '#FFFFFF', fontSize: '26px', lineHeight: 1, marginBottom: '6px' }}
        >
          {artist}
        </Typography>
        <Typography component="p" sx={{ color: '#B8B8B8', fontSize: '14px', lineHeight: 1 }}>
          {albums.length}枚のアルバム、{songsNum}曲
        </Typography>
        <Divider sx={{ borderColor: '#B8B8B8', marginTop: '8px', width: '100%' }} />
      </Box>
      <Box sx={{ padding: '0 20px', overflow: 'auto', maxHeight: 'calc(100% - 90px)' }}>
        {albums &&
          albums.map((album, index) => {
            return <ArtistAlbumListItem key={index} album={album} selectedIndex={props.selectedIndex} />;
          })}
      </Box>
    </Box>
  );
};

export default ArtistAlbumList;
