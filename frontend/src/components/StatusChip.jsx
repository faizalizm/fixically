import React from 'react';
import { Chip } from '@mui/material';

export const StatusChip = ({ label }) => {
  const chipStyle = (label) => {
    if (label === 'CREATED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#E0F2FE',
          color: '#0EA5E9',
        },
      };
    } else if (label === 'LAPTOP RECEIVED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'IN PROGRESS') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#FEF9C3',
          color: '#CA8A04',
        },
      };
    } else if (label === 'READY FOR PICKUP') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'COMPLETED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
        },
      };
    } else if (label === 'CANCELLED') {
      return {
        style: {
          fontWeight: '800',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
        },
      };
    }
  };
  console.log({ ...chipStyle(label) });
  return (
    <>
      <Chip label={label} {...chipStyle(label)} />
    </>
  );
};
