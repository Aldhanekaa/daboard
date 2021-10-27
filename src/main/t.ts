/* eslint-disable @typescript-eslint/no-unused-vars */
import i18nConfig from '../configs/i18next.config';

export default function t(fileName: string, key: string): string {
  return i18nConfig.t(key, { ns: fileName, lng: i18nConfig.language });
}
