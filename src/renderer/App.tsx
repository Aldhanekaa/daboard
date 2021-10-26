import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeConfig from './theme/index';

import HomePage from './pages/home';
import FileManager from './pages/fileManager';

import ReduxStore from './global/index';

export default function App() {
  return (
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
  );
}
