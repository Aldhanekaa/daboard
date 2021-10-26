import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Typography,
  Divider,
  Tabs,
  Tab,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScienceIcon from '@mui/icons-material/Science';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { SetTheme } from '../global/actions/themeMode.action';
import { RootStore } from '../global';

const HomePage = () => {
  const themeMode = useSelector((state: RootStore) => state.themeMode);
  const dispatch = useDispatch();

  const [tabValue, settabValue] = React.useState<number>(0);
  const [openQuitAppDialog, setOpenQuitAppDialog] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newtabValue: number) => {
    settabValue(newtabValue);
  };

  const handleCloseQuitAppDialog = () => {
    setOpenQuitAppDialog(false);
  };

  return (
    <>
      <Dialog
        open={openQuitAppDialog}
        onClose={handleCloseQuitAppDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure Want To Quit This App?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseQuitAppDialog}>No</Button>
          <Button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.electron.ipcRenderer.quitApp();
              // console.log(window.electron.ipcRenderer);
            }}
            autoFocus
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Container sx={{ paddingTop: 20 }}>
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2" component="div" gutterBottom>
              Daboard App Manager
            </Typography>

            <Stack direction="row">
              <Tooltip title="Toggle Dark Mode">
                <IconButton
                  sx={{ width: '60px', height: '60px' }}
                  color="primary"
                  aria-label="dark mode"
                  onClick={() => {
                    dispatch(SetTheme(themeMode === 'dark' ? 'light' : 'dark'));
                  }}
                >
                  {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Quit App">
                <IconButton
                  sx={{ width: '60px', height: '60px' }}
                  color="error"
                  aria-label="shutdown"
                  onClick={() => {
                    setOpenQuitAppDialog(true);
                  }}
                >
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Typography component="p" gutterBottom>
            Welcome to Daboard App Manager! Multiple Apps in one desktop app,
            a.k.a All in one App!
          </Typography>
        </Box>

        <Divider sx={{ mb: 0, mt: 5 }} />
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="fullWidth"
            component="div"
          >
            <Tab icon={<AppsIcon />} label="Apps" />
            <Tab icon={<ScienceIcon />} label="Labs" />
            <Tab icon={<AccountCircleIcon />} label="User System Information" />
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
