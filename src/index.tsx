import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

import { colors } from "constants/colors";

import "./style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const styles = {
    global: {
        body: {
            fontFamily: "Poppins, sans-serif;",
            bg: colors.primaryWhite,
        },
    },
};

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({ styles, config });

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
