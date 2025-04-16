import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
// import { navigationCustomizations } from './customizations/navigation';
// import { surfacesCustomizations } from './customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  //disableCustomTheme?: boolean;
  //themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children } = props
  // const { children, disableCustomTheme, themeComponents } = props;
  // const theme = React.useMemo(() => {
  //   return disableCustomTheme
  //     ? {}
  //     : createTheme({
  //         // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
  //         cssVariables: {
  //           colorSchemeSelector: 'data-mui-color-scheme',
  //           cssVarPrefix: 'template',
  //         },
  //         colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
  //         typography,
  //         shadows,
  //         shape,
  //         components: {
  //           ...inputsCustomizations,
  //           ...dataDisplayCustomizations,
  //           ...feedbackCustomizations,
  //           ...navigationCustomizations,
  //           ...surfacesCustomizations,
  //           ...themeComponents,
  //         },
  //       });
  // }, [disableCustomTheme, themeComponents]);
  // if (disableCustomTheme) {
  //   return <React.Fragment>{children}</React.Fragment>;
  // }

  const theme = React.useMemo(() => {
    // const defaultTheme = createTheme({
    //   components: {
    //     MuiTypography: {
    //       defaultProps: {
    //         variantMapping: {
    //           h1: 'h1',
    //           h2: 'h2',
    //           h3: 'h3',
    //           h4: 'h4',
    //           h5: 'h5',
    //           h6: 'h6',
    //           subtitle1: 'h6',
    //           subtitle2: 'h6',
    //           body1: 'p',
    //           body2: 'span',
    //         },
    //       },
    //     },
    //   },
    // })

    return createTheme({
      spacing: 8, // recommended spacing 8px (https://mui.com/material-ui/customization/spacing/)
      typography: {
        fontSize: 12,
        fontFamily: [
          'Poppins',
          'Oswald',
          'Lato',
          'Railway',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}
