import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import ThemeConfig from './theme/index';

import HomePage from './pages/home';
import FileManager from './pages/fileManager';
import Internalisation from './Internalisation';

import ReduxStore from './global/index';
import i18n from '../configs/i18next.config';

// const initialI18nStore = window.electron.ipcRenderer.sendSync(
//   'get-initial-translations'
// );

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Internalisation>
        <Provider store={ReduxStore}>
          <ThemeConfig>
            <Router>
              <Switch>
                <Route exact path="/" component={HomePage} />
              </Switch>
              <Switch>
                <Route path="/file-manager" component={FileManager} />
              </Switch>
            </Router>
          </ThemeConfig>
        </Provider>
      </Internalisation>
    </I18nextProvider>
  );
}
