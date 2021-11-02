import { styled } from 'stitches.config';
import { BaseButton } from 'styles/button';

export const TabButton = styled(BaseButton, {
  px: 24,
  py: 8,
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  textAlign: 'left',
  transition: 'all 200ms ease-out',
  '& svg': {
    verticalAlign: '-4px',
    mr: 8,
  },
  '&:hover': {
    backgroundColor: '$blue4',
  },
  '&:active': {
    transform: 'scale(0.96)',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$blue4',
      },
    },
  },
});

export const ControlButton = styled(BaseButton, {
  borderRadius: '50%',
  aspectRatio: 1,
  width: 64,
  height: 64,
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'uppercase',
  display: 'grid',
  placeItems: 'center',

  transition: 'all 200ms ease-out',
  '&:active': {
    transform: 'scale(0.9)',
  },

  variants: {
    type: {
      default: {
        backgroundColor: '$green',
        color: '$blue6',
      },
      ghost: {
        border: '1px solid $blue5',
      },
      muted: {
        backgroundColor: '$blue2',
      },
      active: {
        backgroundColor: '$red',
      },
    },
    size: {
      L: {
        width: 96,
      },
      M: {
        width: 64,
      },
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'M',
  },
});

export const PillButton = styled(BaseButton, {
  px: 12,
  py: 6,
  fontSize: 14,
  fontWeight: 600,
  color: '$blue5',
  borderRadius: 4,
  display: 'grid',
  placeItems: 'center',

  '& svg': {
    verticalAlign: 'center',
  },
  '@phone': {
    px: 8,
  },

  transition: 'all 200ms ease-out',
  '&:hover': {
    backgroundColor: '$blue3',
  },
  '&:active': {
    transform: 'scale(0.96)',
  },

  variants: {
    state: {
      active: {
        backgroundColor: '$blue2',
        border: '1px solid $blue4',
        '&:hover': {
          backgroundColor: '$blue2',
        },
      },
    },
  },
});
