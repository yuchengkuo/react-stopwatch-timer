import { styled } from 'stitches.config';

export const BaseButton = styled('button', {
  boxSizing: 'border-box',
  appearance: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  color: '$foreground',
  cursor: 'pointer',
  fontFamily: 'inherit',

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
