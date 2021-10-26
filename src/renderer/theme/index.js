import * as React from 'react';

import PropTypes from 'prop-types';
// material
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider,
  StyledEngineProvider as StylesProvider,
  createTheme,
} from '@mui/material/styles';
//
import shape from './shape';
import LightPalette from './palette/light';
import DarkPalette from './palette/dark';

import typography from './typography';
import breakpoints from './breakpoints';
// eslint-disable-next-line import/no-cycle
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

// const theme = createTheme({
//   palette,
//   shape,
//   typography,
//   breakpoints,
//   shadows,
//   customShadows,
// });

const getDesignTokens = (mode) => ({
  shape,
  typography,
  breakpoints,
  shadows,
  customShadows,
  ...(mode === 'light'
    ? {
        palette: LightPalette,
      }
    : {
        palette: DarkPalette,
      }),
});

// export { theme };

export default function ThemeConfig({ children }) {
  const [mode, setMode] = React.useState('light');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // window.electron.ipcRenderer.send('getModeTheme');
    window.electron.ipcRenderer.getTheme();

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    window.electron.ipcRenderer.once('receiveModeTheme', (data) => {
      // console.log(data);
      // setMode(data);
      window.electron.ipcRenderer.setTheme(data);
    });

    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    window.electron.ipcRenderer.on('changedThemeMode', (data) => {
      setMode(data);
    });
  }, []);

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode)), // eslint-disable-next-line react-hooks/exhaustive-deps
    getDesignTokens(mode)[mode]
  );

  theme.components = componentsOverride(theme, mode);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles theme={mode} />
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
}

ThemeConfig.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
