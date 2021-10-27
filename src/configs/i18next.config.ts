import { join } from 'path';

import i18n, { InitOptions } from 'i18next';
import i18nextBackend from 'i18next-fs-backend';
import config from './app.config';

import en from './locales/en';
import id from './locales/id';

const i18nextOptions: InitOptions = {
  backend: {
    jsonIndent: 2,

    // path where resources get loaded from
    loadPath: join(__dirname, './locales/{{lng}}/{{ns}}.json'),

    addPath: join(__dirname, './locales/{{lng}}/{{ns}}.missing.json'),
  },
  interpolation: {
    escapeValue: false,
  },
  ns: ['home', 'menu'],
  defaultNS: 'menu',

  fallbackLng: config.fallbackLng,

  supportedLngs: ['en', 'id'],

  resources: {
    en,
    id,
  },
};

i18n.use(i18nextBackend);
// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(i18nextOptions);
}
export default i18n;
