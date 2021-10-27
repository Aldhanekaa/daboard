import * as React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import ThemeConfig from './theme/index';

import HomePage from './pages/home';
import FileManager from './pages/fileManager';

import ReduxStore from './global/index';
import i18n from './i18next.config.client';

// const initialI18nStore = window.electron.ipcRenderer.sendSync(
//   'get-initial-translations'
// );

export default function App() {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log('initialI18nStore', window.electron.ipcRenderer.getLanguage());

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electron.ipcRenderer.on('receive-initial-lang', (data) => {
      console.log('het', data);
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
}
