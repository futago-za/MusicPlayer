import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AlbumItem, { AlbumInfo } from './AlbumItem';
import { useWindowSize } from 'react-use';

const AlbumList = () => {
  const windowSize = useWindowSize();
  const [albums, setAlbums] = useState<AlbumInfo[]>([]);
  const [itemWidth, setItemWidth] = useState<number>();
  const contentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maxItemWidth = 196;
    const contentsWidth = contentsRef.current ? contentsRef.current.offsetWidth : 0;
    let num = Math.ceil(contentsWidth / maxItemWidth);
    if (num < 1) num = 1;
    setItemWidth(Math.floor((contentsWidth - 24) / num));
  }, [windowSize]);

  useEffect(() => {
    (async () => {
      const newAlbums = [];
      const albumsFromSQLite = await window.sqlite.findAlbums();
      for (const albumFromSQLite of albumsFromSQLite) {
        newAlbums.push({
          id: albumFromSQLite.id,
          title: albumFromSQLite.title,
          artist: albumFromSQLite.artist,
          cover: albumFromSQLite.cover,
        });
      }
      setAlbums(newAlbums);
    })();
  }, []);

  return (
    <main className="contents">
      <Box sx={{ maxHeight: '100%', overflow: 'auto', padding: '5px 12px' }} ref={contentsRef}>
        <Grid container spacing="12px" sx={{ marginTop: '0' }}>
          {albums &&
            albums.map((album, index) => {
              return (
                <Grid item key={index}>
                  <AlbumItem width={itemWidth as number} albumInfo={album} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </main>
  );
};

export default AlbumList;
