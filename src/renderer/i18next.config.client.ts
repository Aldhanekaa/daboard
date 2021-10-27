import i18n, { InitOptions } from 'i18next';
import config from '../configs/app.config';

import en from '../configs/locales/en';

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
  },
};

i18n.init(i18nextOptions);
export default i18n;
