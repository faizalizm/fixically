import React from 'react';

import { Divider, useTheme } from '@mui/material';

export const YellowDiv = () => {
  const theme = useTheme();

  return (
    <>
      <Divider
        sx={{
          width: '50px',
          fontWeight: 'bold',
          margin: '24px 0px 48px 0px',
          borderBottomWidth: '7px',
          boxShadow:
            ' -1.23856px -1.23856px 16.1013px #FAFBFF, 2.47712px 2.47712px 18.5784px rgba(166, 171, 189, 0.5)',
          borderRadius: '10px',
          borderColor: theme.palette.primary.main,
        }}
      />
    </>
  );
};
