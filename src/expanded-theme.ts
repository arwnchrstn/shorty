import "@mui/material/styles";
import "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        orange: Palette["primary"];
        lightorange: Palette["primary"];
        lightbrown: Palette["primary"];
        lightgray: Palette["primary"];
        blue: Palette["primary"];
        dark: Palette["primary"];
    }

    interface PaletteOptions {
        orange?: PaletteOptions["primary"];
        lightorange?: PaletteOptions["primary"];
        lightbrown?: PaletteOptions["primary"];
        lightgray?: PaletteOptions["primary"];
        blue?: PaletteOptions["primary"];
        dark?: PaletteOptions["primary"];
    }
}

interface EnableOverrides {
    orange: true
}

declare module '@mui/material' {
    interface ButtonPropsColorOverrides extends EnableOverrides {}

    interface IconButtonPropsColorOverrides extends EnableOverrides {}

    interface CircularProgressPropsColorOverrides extends EnableOverrides {}

    interface TextFieldPropsColorOverrides extends EnableOverrides {}
}