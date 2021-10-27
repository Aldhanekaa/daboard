import { merge } from 'lodash';
import { Theme, Components } from '@mui/material/styles';
import Card from './Card';
import Lists from './Lists';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import IconButton from './IconButton';
import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(
  theme: Theme,
  mode: 'light' | 'dark'
): Components {
  return {
    ...merge(
      Card(theme, mode),
      Lists(),
      Paper(),
      Input(theme),
      Button(theme),
      Tooltip(theme, mode),
      Backdrop(theme, mode),
      Typography(),
      IconButton(theme),
      Autocomplete(theme)
    ),
    MuiTab: {
      styleOverrides: {
        root: {
          color:
            mode === 'light'
              ? theme.palette.grey[500]
              : theme.palette.grey[400],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' && '#212B36',
          boxShadow: mode === 'dark' && 'initial',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000',
        },
        list: {
          backgroundColor: mode === 'dark' && '#161C24',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        selected: {
          backgroundColor: '#ddd',
        },
      },
    },
  };
}
