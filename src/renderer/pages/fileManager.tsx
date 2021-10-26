import * as React from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Typography,
  Divider,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Breadcrumbs,
  Link,
} from '@mui/material';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { SetTheme } from '../global/actions/themeMode.action';
import { RootStore } from '../global';

const FileManagerPage = () => {
  const themeMode = useSelector((state: RootStore) => state.themeMode);
  const dispatch = useDispatch();

  const [openQuitAppDialog, setOpenQuitAppDialog] = React.useState(false);

  const handleCloseQuitAppDialog = () => {
    setOpenQuitAppDialog(false);
  };

  const breadcrumbs = [
    <Link key="1" underline="hover" color="inherit" href="/">
      <LinkRouter to="/">Home</LinkRouter>
    </Link>,
    <Typography
      sx={{
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline',
        },
      }}
      key="2"
      color="text.primary"
    >
      File Manager
    </Typography>,
  ];

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
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h2" component="div" gutterBottom>
              Daboard - File Manager
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
            Welcome to the file manager app, you can manage your local file in
            this page!
          </Typography>
        </Box>

        <Divider sx={{ mb: 0, mt: 5 }} />
        <Box sx={{ width: '100%' }}>asd</Box>
      </Container>
    </>
  );
};

export default FileManagerPage;
