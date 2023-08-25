import { createTheme } from '@mui/material/styles';

const useCustomTheme = createTheme({
    palette: {
        orange: {
            main: "#F07C1D"
        },
        lightorange: {
            main: "#FFBD83"
        },
        lightbrown: {
            main: "#847860"
        },
        lightgray: {
            main: "#A0B0BD"
        },
        blue: {
            main: "#435EAD"
        },
        dark: {
            main: "#393B3A"
        }
    },
    typography: {
        fontFamily: [
            "Comic Sans MS", "arial"
        ].join(",")
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontSize: 14,
                    paddingLeft: 15,
                    paddingRight: 15,
                }
            },
            variants: [
                {
                    props: { color: "orange" },
                    style: {
                        color: "white"
                    }
                },
                {
                    props: { color: "orange", variant: "text" },
                    style: {
                        color: "#F07C1D"
                    }
                },
            ]
        },
        MuiCircularProgress: {
            variants: [
                {
                    props: { color: "orange" },
                    style: {
                        color: "#F07C1D"
                    }
                }
            ]
        },
        MuiTypography: {
            variants: [
                {
                    props: { color: "orange" },
                    style: {
                        color: "#F07C1D"
                    }
                }
            ]
        }
    }
})

export default useCustomTheme;