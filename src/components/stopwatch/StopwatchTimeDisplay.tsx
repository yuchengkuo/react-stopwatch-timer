import { styled } from 'stitches.config';

export const StopwatchTimeDisplay = styled('div', {
  boxSizing: 'border-box',
  maxWidth: 420,
  backgroundColor: '$blue2',
  border: 'solid 1px $blue4',
  borderRadius: 8,

  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 8,
  p: 24,
});
