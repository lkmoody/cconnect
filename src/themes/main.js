import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Source Sans Pro',
            'arial',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#09234B'
        },
        secondary: {
            main: '#02ADF1'
        },
        error: {
            main: '#EA1D1F'
        },
        grey: {
            main: '#3F3F3F',
            light: '#EEEEEE'
        },
        twitter: {
            main: '#1DA1F2'
        }
    },
    dashboard: {
        topBanner: {
            height: 80
        },
        sideNav: {
            width: 224
        }
    }
});