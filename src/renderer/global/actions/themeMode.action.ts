import { Dispatch } from 'redux';

export enum ThemeActions {
  setTheme = 'setTheme',
}

export interface SetThemeI {
  type: ThemeActions.setTheme;
  Theme: 'light' | 'dark';
}
export type ThemeDispatchTypes = SetThemeI;

export const SetTheme =
  (Theme: 'light' | 'dark') => (dispatch: Dispatch<ThemeDispatchTypes>) => {
    dispatch({
      type: ThemeActions.setTheme,
      Theme,
    });

    // console.log('hey');
  };
