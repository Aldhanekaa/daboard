import * as React from 'react';
import { useTranslation } from 'react-i18next';

export default function Internalisation(props: { children: JSX.Element }) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, i18n] = useTranslation('index');

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electron.ipcRenderer.getLanguage();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electron.ipcRenderer.on(
      'receive-initial-lang',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_event) => {
        i18n.changeLanguage(_event);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return props.children;
}
