import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MusicItem, { MusicInfo } from './MusicItem';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { State } from '../../../reducks/store/initialState';
import { getNewAddedSongsList } from '../../../reducks/musics/selectors';

const ListItemHeader = styled(Typography)({
  lineHeight: 1,
  fontSize: '18px',
  color: '#FFFFFF',
  fontWeight: 'bold',
});

const Contents: React.FC = () => {
  const selector = useSelector((state: State) => state);
  const windowSize = useWindowSize();
  const [newAddedSongItems, setNewAddedSongItems] = useState<MusicInfo[]>([]);
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
      const newAddedSongsIds: number[] = getNewAddedSongsList(selector);
      const musics: MusicInfo[] = [];
      console.log("A", newAddedSongsIds)
      for (const newAddedSongsId of newAddedSongsIds) {
        const item = await window.sqlite.findSong(newAddedSongsId);
        console.log(item)
        if (!item) continue;
        musics.push({
          id: item.id,
          title: item.title,
          artist: item.artist.name,
          cover: item.album.cover,
          filePath: item.filePath,
          duration: item.duration,
        });
      }
      setNewAddedSongItems(musics);
    })();
  }, [selector.musics]);

  return (
    <main className="contents">
      <Box sx={{ maxHeight: '100%', overflow: 'auto', padding: '17px 12px' }} ref={contentsRef}>
        <Stack spacing="36px">
          <Box>
            <ListItemHeader>新規追加</ListItemHeader>
            <Grid container spacing="12px" sx={{ marginTop: '4px' }}>
              {newAddedSongItems &&
                newAddedSongItems.map((item, index) => {
                  return (
                    <Grid item key={index}>
                      <MusicItem width={itemWidth as number} musicInfo={item} />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </main>
  );
};

export default Contents;
