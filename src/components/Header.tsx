import React from 'react';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Header: React.FC = () => {
  return (
    <div className="header">
      <Paper
        elevation={3}
        sx={{ display: 'flex', alignItems: 'center', width: '272px', borderRadius: '15px', margin: '0 33px 0 auto' }}
      >
        <SearchIcon sx={{ marginLeft: '12px' }} />
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '12px' }}
          placeholder="アーティスト、曲、アルバムなど"
          inputProps={{ 'aria-label': 'アーティスト、曲、アルバムなど' }}
        />
      </Paper>
    </div>
  );
};

export default Header;
