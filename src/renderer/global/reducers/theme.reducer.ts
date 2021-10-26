import { ThemeActions, ThemeDispatchTypes } from '../actions/themeMode.action';

export type ThemeState = 'light' | 'dark';

const defaultTheme: ThemeState = 'light';

const ThemeReducer = (
  state: ThemeState = defaultTheme,
  action: ThemeDispatchTypes
): ThemeState => {
  // console.log(state);

  switch (action.type) {
    case ThemeActions.setTheme:
      console.log('theme', action.Theme);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.electron.ipcRenderer.setTheme(action.Theme);

      return action.Theme;
    default:
      return state;
  }
};

export default ThemeReducer;
