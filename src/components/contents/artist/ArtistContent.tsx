import React, { useState } from 'react';
import ArtistAlbumList from './ArtistAlbumList';
import ArtistList from './ArtistList';
import Box from '@mui/material/Box';

const ArtistContents = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <main className="contents">
      <Box className="wrapper-row" sx={{ width: '100%', height: '100%' }}>
        <ArtistList handleItemClick={handleItemClick} selectedIndex={selectedIndex} />
        <ArtistAlbumList selectedIndex={selectedIndex} />
      </Box>
    </main>
  );
};

export default ArtistContents;
