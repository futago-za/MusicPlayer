import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ArtistItem, { ArtistInfo } from './ArtistItem';

const ArtistList = (props: {
  handleItemClick: (event: React.MouseEvent, index: number) => void;
  selectedIndex: number;
}) => {
  const [artists, setArtists] = useState<ArtistInfo[]>([]);

  useEffect(() => {
    (async () => {
      const newArtists = [];
      newArtists.push({ id: 0, name: 'すべてのアーティスト' });
      const tempArtists = await window.sqlite.findArtists();
      newArtists.push(...tempArtists);
      setArtists([...newArtists]);
    })();
  }, []);

  return (
    <Box
      sx={{
        width: '203px',
        background: '#454545',
        height: '100%',
        boxShadow: '4px 0px 4px -4px rgba(0, 0, 0, 0.25)',
        overflow: 'auto',
        zIndex: 10,
      }}
    >
      <List sx={{ padding: 0 }}>
        {artists &&
          artists.map((artist, index) => {
            return (
              <ArtistItem
                key={index}
                artistInfo={artist}
                selectedIndex={props.selectedIndex}
                handleItem={props.handleItemClick}
              />
            );
          })}
      </List>
    </Box>
  );
};

export default ArtistList;
