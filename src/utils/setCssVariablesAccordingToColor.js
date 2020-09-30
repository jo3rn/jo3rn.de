import { INITIAL_COLOR_MODE_CSS_PROP } from "../constants"

export function setCssVariablesAccordingToColor(colors, colorMode) {
    const root = window.document.documentElement;
    Object.entries(colors).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;
        root.style.setProperty(cssVarName, colorByTheme[colorMode]);
    });

    root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode);
}