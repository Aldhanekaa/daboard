// ----------------------------------------------------------------------
import isDarkMode from '../../utils/isDarkMode';

export default function Tooltip(theme, mode) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDarkMode(mode)
            ? theme.palette.grey[0]
            : theme.palette.grey[800],
        },
        arrow: {
          color: isDarkMode(mode)
            ? theme.palette.grey[600]
            : theme.palette.grey[800],
        },
      },
    },
  };
}
