import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

export const { styled, globalCss } = createStitches({
  theme: {
    colors: {
      blue1: 'hsla(210, 20%, 95%, 1)',
      blue2: 'hsla(210, 10%, 91%, 1)',
      blue3: 'hsla(210, 15%, 88%, 1)',
      blue4: 'hsla(210, 10%, 83%, 1)',
      blue5: 'hsla(210, 5%, 47%, 1)',
      blue6: 'hsla(210, 33%, 8%, 1)',
      green: 'hsla(119, 80%, 67%, 1)',
      red: 'hsla(0, 100%, 78%, 1)',

      background: '$blue1',
      foreground: 'black',
      active: '$green',
    },
    fonts: {
      sans: 'Archivo',
    },
  },
  media: {
    phone: '(max-width: 400px)',
    tablet: '(max-width: 1200px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingLeft: value,
    }),
    m: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginLeft: value,
    }),
  },
});
