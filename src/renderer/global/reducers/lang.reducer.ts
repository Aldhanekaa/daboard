import { LangActions, LangDispatchTypes } from '../actions/lang.action';

export type LangState = string;

const defaultLang: LangState = 'en-gb';

const LangReducer = (
  state: LangState = defaultLang,
  action: LangDispatchTypes
): LangState => {
  // console.log(state);

  switch (action.type) {
    case LangActions.setLang:
      return action.lang;
    default:
      return state;
  }
};

export default LangReducer;
