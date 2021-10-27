import i18n, { InitOptions } from 'i18next';
import config from '../configs/app.config';

import en from '../configs/locales/en';
import id from '../configs/locales/id';

const i18nextOptions: InitOptions = {
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
  fallbackLng: config.fallbackLng,
  lowerCaseLng: true,

  supportedLngs: ['en', 'id'],
  resources: {
    en,
    id,
  },
};

i18n.init(i18nextOptions);
export default i18n;
