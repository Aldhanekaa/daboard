import { alpha } from '@mui/material/styles';
import isDarkMode from '../../utils/isDarkMode';

// ----------------------------------------------------------------------

export default function Backdrop(theme, mode) {
  const varLow = alpha(
    isDarkMode(mode) ? theme.palette.grey[0] : theme.palette.grey[900],
    0.48
  );
  const varHigh = alpha(
    isDarkMode(mode) ? theme.palette.grey[0] : theme.palette.grey[900],
    1
  );

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            `rgb(22,28,36)`,
            `-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
            `linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
          ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  };
}
