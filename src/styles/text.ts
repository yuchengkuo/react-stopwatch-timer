import { styled } from 'stitches.config';

export const Text = styled('p', {
  boxSizing: 'border-box',
  m: 0,
  p: 0,
  color: '$blue6',
  lineHeight: 1,

  variants: {
    type: {
      h1: {
        fontSize: 32,
        fontWeight: 500,
        mb: 0,
      },
      digit: {
        fontSize: 48,
        fontWeight: 400,
        fontFeatureSettings: '"tnum" on, "lnum" on',
        color: '$black',
      },
      timer: {
        fontSize: 32,
        fontWeight: 400,
        fontFeatureSettings: '"tnum", "lnum"',
      },
      timerActive: {
        fontSize: 48,
        fontWeight: 400,
        fontFeatureSettings: '"tnum", "lnum"',
      },
    },
  },
});
