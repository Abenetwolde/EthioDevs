import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffb28a' : '#037d50',
      },
      secondary: {
        main: darkMode ? '#f3b9bb' : '#941a1c',
      },
      appbar: {
        main: darkMode ? '' : '#037d50',
      },
      inputSerach: {
        main: darkMode ? '' : 'white',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  });

export default customTheme;
