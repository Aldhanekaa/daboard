import { combineReducers } from 'redux';
// import UserReducer from "./auth";
// import IoTCSReducer from "./IoTCSApp.reducer";
import LangReducer from './lang.reducer';
import ThemeModeReducer from './theme.reducer';

const reducers = combineReducers({
  // user: UserReducer,
  // iotApp: IoTCSReducer,
  lang: LangReducer,
  themeMode: ThemeModeReducer,
});

export default reducers;
