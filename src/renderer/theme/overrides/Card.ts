// ----------------------------------------------------------------------
import { Theme, Components } from '@mui/material/styles';

export default function Card(theme: Theme, mode: 'light' | 'dark'): Components {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mode === 'dark' ? theme.customShadows.z1 : theme.customShadows.z16,

          borderRadius:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            theme.shape.borderRadiusMd,
          position: 'relative',
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
  };
}
