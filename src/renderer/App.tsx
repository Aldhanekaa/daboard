import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ThemeConfig from './theme/index';

import HomePage from './pages/home';

import ReduxStore from './global/index';

export default function App() {
  return (
    <Provider store={ReduxStore}>
      <ThemeConfig>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </ThemeConfig>
    </Provider>
  );
}
