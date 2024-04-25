import React from 'react';
import { Button, useTheme } from '@mui/material';

const ButtonComponent = ({ label, onClick }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.alt,
        fontSize: '14px',
        fontWeight: 'bold',
        width: 1,
      }}
      onClick={onClick}
    >
      {label} 
    </Button>
  );
};

export default ButtonComponent ;
