import { globalCss } from 'stitches.config';

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Archivo',
      src: 'url("/fonts/Archivo-Regular.woff2") format("woff2")',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Archivo',
      src: 'url("/fonts/Archivo-Medium.woff2") format("woff2")',
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Archivo',
      src: 'url("/fonts/Archivo-SemiBold.woff2") format("woff2")',
      fontWeight: 600,
      fontStyle: 'normal',
    },
  ],
  html: {
    backgroundColor: '$background',
    color: '$foreground',
  },
  body: {
    fontFamily: '$sans',
    m: 0,
    p: 0,
    minHeight: '100vh',
    '& #root': {
      height: '100%',
    },
  },
});
